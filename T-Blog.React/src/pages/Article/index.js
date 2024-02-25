import { Breadcrumb, Card, Form, Radio, Select,Button,RangePicker } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getChannelAPI } from "../../apis/article";

const { Option } = Select


const Article = () => {
   const [channelList, setChannelList] = useState([]);
   useEffect(() => {
      const getChannelList = async () => {
         const res = await getChannelAPI();
         setChannelList(res);
      }
      getChannelList();
   }, [])
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
                     {channelList.map(n => { return <Option>{n.name}</Option> })}
                  </Select>
               </Form.Item>
               <Form.Item
               label='日期'
               name='date'>
                  <RangePicker locale={locale} />
               </Form.Item>
               <Form.Item>
                  <Button type='primary'  htmlType="submit" style={{marginLeft:40}}筛选></Button>
               </Form.Item>

            </Form>
         </Card>
      </div>
   )
}    