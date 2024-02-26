import { Breadcrumb, Button, Card, Form, Input, Radio, Select, Space, Upload, message } from "antd"
import './index.scss'
import { useState } from "react";
import { createArticleAPI } from "../../apis/article";
import { Link } from "react-router-dom";
import 'react-quill/dist/quill.snow.css'
import ReactQuill from "react-quill";
import { PlusOutlined } from "@ant-design/icons";
import { useChannel } from "../../hooks/useChannel";
const { Option } = Select

const Publish = () => {
    const onFinish = async (formData) => {
      if(imageList.length!==imageType)return message.warning('封面图片');
        const { title, content, channel_id } = formData;
        const reqData = {
            title,
            content,
            cover: {
                type: imageType,
                images:imageList.map(i=>i.response)
            },
            channel_id
        };
        console.log(reqData);
        const res = await createArticleAPI(reqData);
        console.log(res);
    }

    const [imageList, setImageList] = useState([]);
    const[imageType,setImageType]=useState(0);
 
    const{channelList}=useChannel();

    const onchange = (value) => {
        console.log('Uploading...', value);
        setImageList(value.fileList);
    }
const onTypeChange=(e)=>{
    setImageType(e.target.value);
}
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
            initialValues={{ type: 0 }}>
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
            <Form.Item label='封面'>
                <Form.Item name='type'>
                    <Radio.Group onChange={onTypeChange}>
                        <Radio value={1}>单图</Radio>
                        <Radio value={3}>三图</Radio>
                        <Radio value={0}>无图</Radio>
                    </Radio.Group>
                </Form.Item>
                {imageType>0 && <Upload
                    listType="picture-card"
                    showUploadList
                    action='http://localhost:5225/api/Upload/UploadCovers'
                    onChange={onchange} maxCount={imageType}>
                
                    <div style={{ marginTop: 8 }}>
                        <PlusOutlined />
                    </div>
                </Upload>}
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