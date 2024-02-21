import { Breadcrumb, Button, Card, Form, Input, Select, Space } from "antd"
import './index.scss'
import { useEffect, useState } from "react";
import { getChannelAPI } from "../../apis/article";
import { Link } from "react-router-dom";
import 'react-quill/dist/quill.snow.css'
import ReactQuill from "react-quill";
const { Option } = Select

const Publish = () => {
    const onFinish=(formData)=>{
        
    }
    const [channelList, setChannelList] = useState([]);

    useEffect(() => {
        const channels = async () => {
            const res = await getChannelAPI();
            setChannelList(res);
        }
        channels();
    }, [])
    return <Card
        className="publish"
        title={
            <Breadcrumb items={[
                { title: <Link to={'/'}>首页</Link> },
                { title: '发布文章' }
            ]} />
        }>
        <Form
        onFinish={onFinish}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ type: 1 }}>
            <Form.Item
                name='title'
                label="标题"
                rules={[{ required: true, message: '请输入标题' }]}>
                <Input placeholder="请输入标题" style={{ width: 400 }} />
            </Form.Item>
            <Form.Item
                name='channel_id'
                label='频道'
                required={[{
                    require: true, message: '请选择文章频道'
                }]}>
                <Select style={{ width: 400 }} placeholder="请选择文章频道">
                    {channelList.map(n => {
                        return (<Option key={n.id} >{n.name}</Option>)
                    })}
                </Select>
            </Form.Item>
            <Form.Item
                label='内容'
                name='content'
                rules={[{ required: true, message: '请输入文章内容' }]}>
                <ReactQuill
                    className='publish-quill'
                    theme='snow'
                    placeholder="请输入文章内容" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4 }}>
                <Space>
                    <Button size="large" type="primary" htmlType="submit">发布文章</Button>
                </Space>
            </Form.Item>
        </Form>
    </Card>
}
export default Publish;