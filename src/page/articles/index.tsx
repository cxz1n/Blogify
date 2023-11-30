import {
  Table,
  Tag,
  FloatButton,
  Tabs,
  TabsProps,
  Button,
  Space,
  Modal,
  message,
} from "antd";
import { useState, useEffect } from "react";
import { getArticle, delArticle } from "../../api/aricle";
import { EditTwoTone, ExclamationCircleFilled } from "@ant-design/icons";
import dayjs from "dayjs";

const { confirm } = Modal;

const handleEdit = (record: any) => {
  window.open(`/write/${record.id}`, "_blank");
};

const tabsItems: TabsProps["items"] = [
  {
    key: "1",
    label: "文章",
  },
  {
    key: "0",
    label: "草稿",
  },
];
const columns = (handleDel: any) => [
  {
    title: "文章标题",
    dataIndex: "title",
    key: "title",
    render: (text: string) => {
      return text ? text : "无标题";
    },
  },
  {
    title: "文章标签",
    dataIndex: "tag",
    key: "tag",
    render: (text: any, record: any) => {
      return record.tag.map((e: any) => {
        return (
          <Tag color={"blue"} key={e.id}>
            {e.name}
          </Tag>
        );
      });
    },
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    render: (text: any) => {
      return text == 0 ? "草稿" : "已发布";
    },
  },
  {
    title: "创建时间",
    dataIndex: "createtime",
    key: "createtime",
    render: (text: string) => {
      return <span>{dayjs(Number(text)).format("YYYY年MM月DD日")}</span>;
    },
  },
  {
    title: "操作",
    key: "handle",
    render: (text: string, record: any) => {
      return (
        <>
          <Space>
            <Button type={"primary"} onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type={"dashed"} onClick={() => handleDel(record)}>
              删除
            </Button>
          </Space>
        </>
      );
    },
  },
];
// 表格尺寸
const scroll = {
  y: "calc(100vh - 350px)",
};
const Articles = () => {
  //table数据
  const [data, setData] = useState<any[]>([]);
  //分页当前页
  const [current, setCurrent] = useState(1);
  //分页数据总条数
  const [total, setTotal] = useState(0);
  //tabs选中的key
  const [activeKey, setActiveKey] = useState("1");

  useEffect(() => {
    (async () => {
      viewTableData();
    })();
  }, [current, activeKey]);

  // table数据渲染
  const viewTableData = async () => {
    const data = await getArticle({
      pageNum: current,
      pageSize: 10,
      status: activeKey,
    });
    setData(data.data);
    setTotal(data.totalRows);
  };

  // tab切换
  const tabsChange = (key: string) => {
    setActiveKey(key);
  };

  // 分页页码改变
  const pageChange = (page: number) => {
    setCurrent(page);
  };

  // 删除数据
  const handleDel = (record: any) => {
    confirm({
      title: "您确定要删除该条数据吗？",
      icon: <ExclamationCircleFilled></ExclamationCircleFilled>,
      content: "删除后数据不可恢复！",
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      onOk() {
        return new Promise(async (resolve, reject) => {
          try {
            await delArticle(record.id);
            viewTableData();
            message.success("删除成功！");
            resolve(1);
          } catch (err) {
            reject(err);
          }
        });
      },
    });
  };

  // 写文章，跳转新页面
  const handleToWrite = () => {
    window.open("/write/new", "_blank");
  };
  return (
    <>
      <Tabs
        items={tabsItems}
        activeKey={activeKey}
        onChange={tabsChange}
      ></Tabs>
      <Table
        dataSource={data}
        pagination={{
          defaultCurrent: 1,
          pageSize: 10,
          current: current,
          total: total,
          onChange(page, pageSize) {
            pageChange(page);
          },
        }}
        columns={columns(handleDel)}
        rowKey={"id"}
        scroll={scroll}
      ></Table>
      <FloatButton
        onClick={() => {
          handleToWrite();
        }}
        icon={<EditTwoTone />}
      ></FloatButton>
    </>
  );
};

export default Articles;
