import React from 'react'
import { Layout, Table } from 'antd'
import { request } from '../../utils';

// try {
//     const alarms=await request.get('/Alarm');
// } catch (error) {
//     console.log(error);
// }
 const Alarm= ()=> {
    
    // const[data, setData] = useState({alarms});

    
    // const data=alarms.map((n,i)=>{
    //     return {
    //         key:i+1,
    //         alid:n.alid,
    //         type:n.type,
    //         description:n.description,
    //         id:n.id,
    //         source:n.source,
    //         datetime:n.time
    //     }
    // })
    const data={};
    const columns = [{
        title: 'ALID',
        dataIndex: 'alid',
        key: 'alid'
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type'
    }, {
        title: 'Source',
        dataIndex: 'source',
        key: 'source'
    }, {
        title: 'Description',
        dataIndex: 'description',
        key: 'description'
    }, {
        title: 'DateTime',
        dataIndex: 'datetime',
        key: 'datetime'
    }]
    return (
        
        <Layout theme='light'>
            <Table columns={columns}  dataSource={data}/>
        </Layout>
    )
}
export default Alarm;
