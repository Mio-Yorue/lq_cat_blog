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
			description: "耳朵好爽，耳朵好痛",
			link: "https://moondroplab.com/cn/products/chu-ii/",
		},
		{
			name: "飞利浦shp9500",
			image: "/images/device/shp9500.jpg",
			specs: "入门Hifi / 有线连接头戴式耳机",
			description:
				"最杀死比赛的一集，佩戴舒适度堪比超薄0.01这一块，可惜我的转轴断掉了qwq",
			link: "https://www.philips.com.cn/c-p/SHP9500_00/hifi-stereo-headphones",
		},
	],
};
