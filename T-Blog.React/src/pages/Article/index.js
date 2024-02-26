import { Breadcrumb, Card, Form, Radio, Select, Button, DatePicker } from "antd";
import { useEffect, useState } from "react";
import { useChannel } from "../../hooks/useChannel";
import { Link } from "react-router-dom";
import locale from 'antd/es/date-picker/locale/zh_CN'
import { getArticleListAPI } from "../../apis/article";
const { Option } = Select;
const { RangePicker } = DatePicker;

const Article = () => {
   const columns = [{
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
         return <img src={cover.iamges[0]} width={80} height={60} alt="" />
      }
   }]
   const { channelList } = useChannel();
   const[list,setList]=useState([])
   useEffect(()=>{
const getList=async()=>{
   const res=await getArticleListAPI();
   setList(res);
}
getList();
   },[])
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
            <Form initialValues={{ status: null }}>
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
      </div>
   )
}
export default Article;