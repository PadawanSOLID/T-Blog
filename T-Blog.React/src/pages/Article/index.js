import { Breadcrumb, Card, Form, Radio, Select, Button, DatePicker, Table, Tag, Space } from "antd";
import { useEffect, useState } from "react";
import { useChannel } from "../../hooks/useChannel";
import { Link } from "react-router-dom";
import locale from 'antd/es/date-picker/locale/zh_CN'
import { getArticleListAPI } from "../../apis/article";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const { Option } = Select;
const { RangePicker } = DatePicker;
const status = {
   1: <Tag color="warning">待审核</Tag>,
   2: <Tag color="success">审核通过</Tag>,
   3: <Tag color='red'>审核失败</Tag>
}
const Article = () => {
   const columns = [
      {
         title: '封面',
         dataIndex: 'cover',
         width: 120,
         render: cover => {
            return <img />
            return <img src={cover.images[0] || ""} width={80} height={60} alt="" />
         }
      }, {
         title: '序号',
         dataIndex: 'id'
      }, {
         title: '标题',
         dataIndex: 'title',
         width: 220
      }, {
         title: '状态',
         dataIndex: 'status',
         render: data => status[data]
      },
      {
         title: '发布时间',
         dataIndex: 'pubdate'
      }, {
         title: '阅读数',
         dataIndex: 'read_count'
      }, {
         title: '评论数',
         dataIndex: 'comment_count'
      }, {
         title: '点赞数',
         dataIndex: 'like_count'
      }, {
         title: '操作',
         render: data => {
            return (
               <Space size={"middle"}>
                  <Button type="primary" shape="circle" icon={<EditOutlined />} />
                  <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} />
               </Space>
            )
         }
      }
   ]
   const data = [
      {
         id: '8218',
         comment_count: 0,
         cover: {
            iamges: [],
         },
         like_count: 0,
         pubdate: '2019-03-11 09:00:00',
         read_count: 2,
         status: 2,
         title: 'solution'
      }, {
         id: '8218',
         comment_count: 0,
         cover: {
            iamges: [],
         },
         like_count: 0,
         pubdate: '2019-03-11 09:00:00',
         read_count: 2,
         status: 1,
         title: 'solution'
      }, {
         id: '8218',
         comment_count: 0,
         cover: {
            iamges: [],
         },
         like_count: 0,
         pubdate: '2019-03-11 09:00:00',
         read_count: 2,
         status: 3,
         title: 'solution'
      }
   ]
   const onFinish = (formData) => {
      console.log(formData);
      setReqData({
         ...reqData,
         channel_id: formData.channel_id,
         status: formData.status,
         begin_pubdate: formData[0].format('YYYY-MM-DD'),
         end_pubdate: formData[1].format('YYYY-MM-DD'),
      })
   }
   const [reqData, setReqData] = useState({
      status: '',
      channel_id: '',
      begin_pubdate: '',
      end_pubdate: '',
      page: 1,
      per_page: 4
   })
   const { channelList } = useChannel();
   const [list, setList] = useState([])
   const [count, setCount] = useState(0);
   useEffect(() => {
      const getList = async () => {
         const res = await getArticleListAPI(reqData);
         console.log(res);
         const data= res.map(res=>{
            const { id, comment_count, like_count, pubdate, read_count, status, title, covers } = res;
            const data = {
               id, comment_count, like_count, pubdate, read_count, status, title,
               covers:covers? covers.split(';'):[]
            }
            return data;
         })
         console.log(data);
         setList(data);
      
         setCount(3);

      }
      getList();

   }, [reqData])
   return (
      <div>
         <Card
            title={
               <Breadcrumb
                  items={[
                     { title: <Link to={'/'}>首页</Link> },
                     { title: '文章列表' }
                  ]} />
            }
            style={{ marginBottom: 20 }}>
            <Form initialValues={{ status: null }} onFinish={onFinish}>
               <Form.Item
                  label='状态'
                  name="status">
                  <Radio.Group>
                     <Radio value={null}>全部</Radio>
                     <Radio value={0}>草稿</Radio>
                     <Radio value={2}>审核通过</Radio>
                  </Radio.Group>
               </Form.Item>
               <Form.Item
                  label='频道'
                  name='channel_id'>
                  <Select
                     placeholder='请选择文章频道'
                     style={{ width: 120 }}>
                     {channelList.map(n => { return <Option value={n.id} key={n.id}>{n.name} </Option> })}
                  </Select>
               </Form.Item>
               <Form.Item
                  label='日期'
                  name='date'>
                  <RangePicker locale={locale} />
               </Form.Item>
               <Form.Item>
                  <Button type='primary' htmlType="submit" style={{ marginLeft: 40 }}>筛选</Button>
               </Form.Item>

            </Form>
         </Card>
         <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
            <Table rowKey='id' columns={columns} dataSource={list} />
         </Card>
      </div>
   )
}
export default Article;