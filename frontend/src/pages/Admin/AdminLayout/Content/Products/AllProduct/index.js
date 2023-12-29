import { Form, InputNumber, Popconfirm as Onconfirm, Table, Typography, Input, Image } from 'antd';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AllProducts.module.scss';
import Title from 'antd/es/typography/Title';
import { handleGetData, handleGetDataRef, handleRemoveData, handleUpdateData } from '../../../../../../utils/database';
import { ToastError, ToastSuccess, ToastWarning } from '../../../../../../utils/toast';
import Loading from '../../../../AdminComponent/Loading/Loading';
import ItemTitle from '../../../../AdminComponent/ItemTitle';
import { onValue } from 'firebase/database';
import { isEqual } from 'lodash';
import ConfirmModal from '../../../../AdminComponent/ConfirmModal';
import axios from 'axios';

let cx = classNames.bind(styles);

const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const AllRooms = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const [roomIds, setRoomIds] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getListRooms = async () => {
        try {
            axios
                .get('http://localhost:4000/room')
                .then((response) => setData(response.data.data))
                .catch((error) => console.error(error));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getListRooms();
    }, [editingKey]);

    useEffect(() => {
        getListRooms();
    }, [data]);
    const isEditing = (record = {}) => {
        return record.roomName === editingKey;
    };
    const edit = (record) => {
        form.setFieldsValue({
            roomImage: '',
            roomName: '',
            roomDsc: '',
            roomAmenity: '',
            roomPrice: '',
            ...record,
        });
        setEditingKey(record.roomName);
    };
    const cancel = () => {
        setEditingKey('');
    };
    const save = async (record) => {
        console.log(record);
        const row = await form.validateFields();
        console.log(row);
        axios
            .put(`http://localhost:4000/room/${record}`, {
                roomDescription: row.roomDescription,
                roomPrice: row.roomPrice,
            })
            .then((response) => console.log(response), setEditingKey(''))
            .catch((error) => console.log(error));
        // try {
        //     const newData = [...data];
        //     const index = newData.findIndex((item) => key === item.key);
        //     if (index > -1) {
        //         const item = newData[index];
        //         newData.splice(index, 1, {
        //             ...item,
        //             ...row,
        //         });
        //         if (isEqual(data, newData)) {
        //             ToastWarning('Your data is not changed !');
        //             return;
        //         } else {
        //             delete newData[index].roomImage;
        //             await handleUpdateData(`/admin/create-room/rooms/${roomIds[index]}`, newData[index]);
        //             ToastSuccess('Update room information success', 2000);
        //         }
        //         setEditingKey('');
        //     } else {
        //         newData.push(row);
        //         setData(newData);
        //         setEditingKey('');
        //         ToastError('Opps. Something went wrong. Update room information failed.', 2000);
        //     }
        // } catch (errInfo) {
        //     console.log('Validate Failed:', errInfo);
        // }
    };
    const columns = [
        {
            title: 'Room Name',
            dataIndex: 'roomName',
            width: '10%',
            editable: false,
        },
        {
            title: 'Room Type',
            dataIndex: 'roomType',
            render: (roomType) => {
                return roomType.charAt(0).toUpperCase() + roomType.slice(1);
            },
            width: '10%',
            editable: false,
        },
        {
            title: 'Room Amenity',
            dataIndex: 'roomAmenity',
            width: '10%',
            editable: false,
            render: (amenity) => {
                if (amenity.length <= 3) {
                    return amenity.join(', ');
                }
                return amenity.slice(0, 3).join(', ') + '...';
            },
        },
        {
            title: 'Room Rank',
            dataIndex: 'roomRank',
            render: (roomRank) => {
                return roomRank.charAt(0).toUpperCase() + roomRank.slice(1);
            },
            width: '10%',
            editable: false,
        },
        {
            title: 'Room Price',
            dataIndex: 'roomPrice',
            width: '10%',
            editable: true,
            render: (price) => {
                return Number(price).toLocaleString();
            },
        },
        {
            title: 'Room Description',
            dataIndex: 'roomDescription',
            width: '20%',
            editable: true,
        },
        {
            title: 'Edit Rooms',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <ConfirmModal
                            contentConfirm={'Are you sure to modify this room ?'}
                            okTextConfirm={'Modify'}
                            cancelTextConfirm={'Cancel'}
                            onOkConfirm={() => {
                                save(record._id);
                            }}
                        >
                            Save
                        </ConfirmModal>
                        <Onconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <p style={{ color: '#1677ff', display: 'inline-block' }}>Cancel</p>
                        </Onconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
        {
            title: 'Delete Room',
            dataIndex: '',
            key: 'x',
            render: (record) => {
                return (
                    <ConfirmModal
                        contentConfirm={'Are you sure to delete this room ?'}
                        okTextConfirm={'Yes, delete it'}
                        cancelTextConfirm={'Cancel'}
                        onOkConfirm={async () => {
                            setIsLoading(true);
                            try {
                                axios.delete(`http://localhost:4000/room/${record._id}`).then(getListRooms());
                                ToastSuccess('Remove room successfully');
                            } catch (error) {
                                ToastError('Opps. Something went wrong. Remove room failed');
                                console.log(error);
                                throw new Error(error);
                            }
                            await setTimeout(() => {
                                setIsLoading(false);
                            }, 500);
                        }}
                    >
                        Delete
                    </ConfirmModal>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => {
                return {
                    record,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: isEditing(record),
                };
            },
        };
    });
    return (
        <div className={cx('all__rooms--container')}>
            <ItemTitle
                title="Manage All Room Information"
                textContent="You can view and manage all rooms in this page"
            ></ItemTitle>
            <div className={cx('all__room--main')}>
                <div className={cx('all__rooms--form')}>
                    <Title level={5}>Room Summary</Title>
                    <Form form={form} component={false}>
                        {!isLoading ? (
                            <Table
                                components={{
                                    body: {
                                        cell: EditableCell,
                                    },
                                }}
                                bordered
                                dataSource={data}
                                columns={data && mergedColumns}
                                rowClassName="editable-row"
                                pagination={{
                                    onChange: cancel,
                                }}
                            />
                        ) : (
                            <Loading />
                        )}
                    </Form>
                </div>
            </div>
        </div>
    );
};
export default AllRooms;
