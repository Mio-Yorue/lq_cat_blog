// 设备数据配置文件

export interface Device {
	name: string;
	image: string;
	specs: string;
	description: string;
	link: string;
}

// 设备类别类型，支持品牌和自定义类别
export type DeviceCategory = {
	[categoryName: string]: Device[];
} & {
	自定义?: Device[];
};

export const devicesData: DeviceCategory = {
	OnePlus: [
		{
			name: "OnePlus 13",
			image: "/images/device/oneplus13.webp",
			specs: "黑色 / 16G + 512GB",
			description: "旗舰性能 哈苏影像 coloros16 一加nb.",
			link: "https://www.oneplus.com/cn/13/",
		},
	],
	机械革命: [
		{
			name: "机械革命极光x",
			image: "/images/device/jige.png",
			specs: "i7 1460HX / 5060",
			description: "它都鸡哥了还说啥了.",
			link: "https://www.mechrevo.com/service/",
		},
	],
	耳机: [
		{
			name: "水月雨竹Ⅱ",
			image: "/images/device/chu2.avif",
			specs: "入门Hifi / 有线连接绕耳式耳机",
			description: "不怕中耳炎的可以用，建议还是偶尔用头戴缓解一下",
			link: "https://moondroplab.com/cn/products/chu-ii/",
		},
		{
			name: "飞利浦shp9500",
			image: "/images/device/shp9500.jpg",
			specs: "入门Hifi / 有线连接头戴式耳机",
			description: "开放式耳机，音质可以佩戴舒适但是漏音严重，而且转轴容易断",
			link: "https://www.philips.com.cn/c-p/SHP9500_00/hifi-stereo-headphones",
		},
		{
			name: "兴戈 EP5",
			image: "/images/device/ep5.jpg",
			specs: "入门Hifi / 有线连接头戴式耳机",
			description: "夹头，但是听感还可以",
			link: "http://www.simgot.com/products/detail/40.html#!/detail",
		},
		{
			name: "华为 freebuds se4 anc",
			image: "/images/device/huawei.png",
			specs: "无线耳机 / 华为",
			description: "手机厂，水桶耳机，降噪还可以音质别指望了",
			link: "https://consumer.huawei.com/cn/headphones/freebuds-se-4-anc/",
		},
	],
	手柄: [
		{
			name: "飞智冰原狼4 终末地联名",
			image: "/images/device/shoubing.webp",
			specs: "终末地联名款",
			description: "依旧实用性超高的手办",
			link: "https://www.flydigi.com/index/template/index/page_id/10097?nav_id=1",
		},
	],
};
