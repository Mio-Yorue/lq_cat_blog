---
title: 对于lambda表达式的理解
published: 2026-06-24
tags: [Markdown, 算法]
category: Algorithm
draft: false
---

## 在学习lambda表达式时遇到一个很好的例子，是在leetcode中发现的一个题解
``` c++
class Solution { 
	public: int maxNumberOfBalloons(string text) { 
		int n[128]{}; 
		auto cnt = [&](char c){++n[c];}; 
		ranges::for_each(text,cnt); 
		return min({n['b'],n['a'],n['l']/2,n['o']/2,n['n']}); 
	} 
};
```
>这里很巧妙的利用了题目只有一个变量的特征，直接在构建lambda时以引用方式捕获所有外部变量
(for_each函数在std和range库中均有,作用是对每个左参传递给右边调用)

而关于lambda的原理，是在编译时被转换为一个匿名函数对象
# 下面贴一个ai的回答：

```
## 1. lambda 的本质

lambda 表达式在编译时会被转换为一个 **匿名函数对象（functor）**，类似于：

```cpp
// 你的 lambda: [&n](char c){ ++n[c]; }
// 编译器会生成类似这样的类：
class __lambda_xxx {
private:
    int (&n)[128];  // 按引用捕获的变量作为成员变量
public:
    __lambda_xxx(int (&arr)[128]) : n(arr) {}  // 构造函数初始化引用成员
    void operator()(char c) const {  // 注意：默认是 const 成员函数（除非 mutable）
        ++n[c];  // 这里修改了 n，但 n 是引用，所以可以修改
    }
};
```

## 2. 捕获的传递过程

当你写 `auto cnt = [&n](char c){ ++n[c]; };` 时：

- **捕获阶段**：编译器创建 lambda 对象时，将当前作用域中的 `n` 的引用存入该对象的成员变量中（通过构造函数）
    
- **存储阶段**：`cnt` 就是这个匿名类的一个实例，内部持有对 `n` 的引用
    

## 3. `ranges::for_each` 如何调用 lambda

```cpp
ranges::for_each(text, cnt);
```

- `ranges::for_each` 是一个算法，它接受一个范围（`text`）和一个可调用对象（`cnt`）
    
- 内部实现类似：
    

```cpp
for (auto& elem : text) {
    cnt(elem);  // 调用 cnt 的 operator()
}
```

- 每次调用 `cnt(elem)` 时，实际上调用的是 `__lambda_xxx::operator()(char c)`，该函数内部通过成员引用 `n` 来修改外部数组
    

## 4. 关键概念：捕获与调用是分离的

- **捕获**：发生在 lambda 创建时，将外部变量“绑定”到 lambda 对象内部
    
- **调用**：发生在 lambda 被作为参数传递给算法后，算法内部对每个元素调用该 lambda
    

所以 `cnt` 作为一个参数，它本身是一个 **已经捕获了外部变量的函数对象**，可以像普通函数一样被调用，但它内部持有对外部变量的引用/拷贝。

## 5. 如果使用 `[&]` 捕获所有变量

```cpp
auto cnt = [&](char c){ ++n[c]; };
```

编译器生成的匿名类会包含所有外部变量的引用（或指针），但只会在 lambda 体内实际用到的那些变量被优化？实际上，C++ 标准要求只捕获 **lambda 体内 odr-used 的变量**，但 `[&]` 语法会捕获所有可能用到的变量吗？标准规定：默认捕获模式（`[&]` 或 `[=]`）会捕获 lambda 体内 **odr-used** 的变量。但实现上，编译器可能会生成包含所有可见外部变量的成员，不过标准允许只捕获实际使用的。无论如何，`cnt` 对象内部会持有对 `n` 的引用（因为 `n` 在 lambda 体内被使用）。

## 6. 示例验证

```cpp
void foo() {
    int n[128]{};
    auto cnt = [&n](char c){ ++n[c]; };
    // cnt 的类型是编译器生成的匿名类，size 可能比指针大（因为包含引用成员）
    std::cout << sizeof(cnt) << std::endl;  // 通常为 8（64位系统引用大小）
    
    std::string text = "balloon";
    ranges::for_each(text, cnt);  // cnt 被拷贝（每次调用？实际上 ranges::for_each 可能传引用）
    // 调用后 n 被修改
}
```

注意：`ranges::for_each` 通常接受可调用对象的 **值**（按值传递），但 lambda 通常很小，且捕获的引用会保持有效。如果 lambda 按值传递，则内部引用的副本仍然指向同一个 `n`，所以修改是有效的。

## 总结喵

- **捕获**：将外部变量“存入”lambda 对象（引用或拷贝）
    
- **传参**：lambda 对象作为参数传递给算法，算法内部调用其 `operator()`
    
- **执行**：每次调用 `cnt(elem)` 时，通过内部存储的引用访问外部变量，并执行函数体


这样，即使 `n` 是在 `foo` 函数中定义的局部变量，lambda 对象内部持有对它的引用，在 `ranges::for_each` 执行期间仍然有效（因为 `foo` 还没结束），所以可以安全修改。
# lambda也有不少缺陷

lambda在c++有一个缺陷就是悬空引用，例如下列代码：
```c++
auto getLambda() {
    int x = 42;
    return [&](){ return x; };  // x 在函数结束后销毁，lambda 返回悬空引用
}
```
这里在函数执行完毕后x的生命周期结束被销毁，但是编译时产生的lambda对象还存在，也就会导致悬空引用，引用到了不存在的值
> 关于生命周期，详见[[生命周期]]

简单来说，lambda表达式的生命周期是从被创建就开始的，随着函数的销毁一并销毁，所以用函数来创建一个lambda表达式就容易发生悬空引用，例如：
```c++
std::function<void(char)> getLambda() {
    int n[128]{};
    auto cnt = [&n](char c){ ++n[c]; };
    return cnt;  // 返回 lambda 对象，生命周期被延长到函数外
}  // n 被销毁，但返回的 lambda 对象内部引用已失效

int main() {
    auto f = getLambda();  // f 对象存在，但引用的 n 已销毁
    f('b');  // 未定义行为！因为引用的对象生命周期已经结束
}
```

