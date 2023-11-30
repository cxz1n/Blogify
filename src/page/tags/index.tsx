import { Table } from "antd";
import { useState, useEffect } from "react";
import { getTags } from "../../api/tag";
import dayjs from "dayjs";

const columns = [
  {
    title: "标签名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "创建时间",
    dataIndex: "createtime",
    key: "createtime",
    render: (text: string) => {
      return <span>{dayjs(Number(text)).format("YYYY年MM月DD日")}</span>;
    },
  },
];
const Tags = () => {
  //table数据
  const [data, setData] = useState<any[]>([]);
  //分页当前页
  const [current, setCurrent] = useState(1);
  //分页数据总条数
  const [total, setTotal] = useState(0);
  // 分页页码改变
  const pageChange = (page: number) => {
    setCurrent(page);
  };
  useEffect(() => {
    (async () => {
      viewTableData();
    })();
  }, [current]);
  const viewTableData = async () => {
    const data = await getTags({
      pageNum: current,
      pageSize: 10,
    });
    console.log("data>>>", data);

    setData(data.data);
    setTotal(data.totalRows);
  };
  return (
    <>
      <Table
        dataSource={data}
        columns={columns}
        pagination={{
          defaultCurrent: 1,
          pageSize: 10,
          current: current,
          total: total,
          onChange(page, pageSize) {
            pageChange(page);
          },
        }}
        rowKey={"id"}
      ></Table>
    </>
  );
};

export default Tags;
