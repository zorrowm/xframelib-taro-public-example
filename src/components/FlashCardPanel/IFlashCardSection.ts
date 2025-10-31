interface IFlashCardSection {
  img: string;
  title?: string;
  desc?: string;
  url?: string;
  tag?: any;
}

export default IFlashCardSection;

const dataDemoList = [
  {
    img: 'apiExampleimg/3dmax.png',
    title: '示例1',
    desc: '示例描述内容',
    url: 'www.baidu.com',
  },
  {
    img: 'apiExampleimg/blur.gif',
    title: '示例2',
    desc: '示例2描述内容',
    url: 'www.baidu.com',
  },
  {
    img: 'apiExampleimg/cluster_clustering.gif',
    title: '示例3',
    desc: '示例3描述内容',
    url: 'www.baidu.com',
  },
  {
    img: 'apiExampleimg/bounce_billboard.gif',
    title: '示例4',
    desc: '示例4描述内容',
    url: 'www.baidu.com',
  },
  {
    img: 'apiExampleimg/contourLine.png',
    title: '示例5',
    desc: '示例5描述内容',
    url: 'www.baidu.com',
  },
  {
    img: 'apiExampleimg/measure.png',
    title: '示例6',
    desc: '示例6描述内容',
    url: 'www.baidu.com',
  },
];
export { dataDemoList };
