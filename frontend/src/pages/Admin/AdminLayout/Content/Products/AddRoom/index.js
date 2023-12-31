import { PlusOutlined } from '@ant-design/icons';
import { Checkbox, Col, DatePicker, Form, Input, InputNumber, Radio, Row, Select, Upload, Modal, message } from 'antd';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AddRoom.module.scss';
import { handleGetData, handlePushData } from '../../../../../../utils/database';
import { v4 as uuidv4 } from 'uuid';
import uploadFile from '../../../../../../utils/storage';
import { ToastError, ToastSuccess } from '../../../../../../utils/toast';
import ItemTitle from '../../../../AdminComponent/ItemTitle';
import Loading from '../../../../AdminComponent/Loading/Loading';
import axios from 'axios';

let cx = classNames.bind(styles);

const { TextArea } = Input;
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

// y
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }

    return isJpgOrPng && isLt2M;
};

const AddRoom = () => {
    const [form] = Form.useForm();
    const [componentDisabled, setComponentDisabled] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    const [amenity, setAmenity] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const dummyRequest = ({ onSuccess }) => {
        setTimeout(() => {
            onSuccess('ok');
        }, 0);
    };
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload room image
            </div>
        </div>
    );

    const getListAmenity = async () => {
        const listAmenities = await handleGetData('/amenity');
        const amenityResults = [];
        for (const amenity in listAmenities.val()) {
            if (Object.hasOwnProperty.call(listAmenities.val(), amenity)) {
                const element = listAmenities.val()[amenity];
                amenityResults.push(element);
            }
        }
        setAmenity(amenityResults);
    };
    useEffect(() => {
        getListAmenity();
    }, []);

    const handleChange = async ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onFinish = async (value) => {
        try {
            axios
                .post('http://localhost:4000/room', {
                    roomName: value.roomName,
                    roomType: value.roomType,
                    roomAmenity: value.roomAmenity,
                    roomRank: value.roomRank,
                    roomCreatedAt: value.roomCreatedAt,
                    roomPrice: value.roomPrice,
                    roomDescription: value.roomDesc,
                })
                .then((response) => {
                    console.log(response);
                    setTimeout(() => {
                        ToastSuccess('Add new room success', 2000);
                        setIsLoading(false);
                    }, 500);
                    form.resetFields();
                })
                .catch((error) => {
                    ToastError('Opps. Something went wrong. Add room failed !!');
                });
        } catch (error) {
            ToastError('Opps. Something went wrong. Add room failed !!');
        }
    };
    return (
        <>
            {!isLoading ? (
                <div className={cx('add__room--container')}>
                    <ItemTitle title="Add new room" textContent="This is the page to create new room" />
                    <div className={cx('add__room--content')}>
                        <Row className={cx('room__content--title')}>
                            <ItemTitle
                                title="Field Information"
                                textContent="You must fill in this fields to create new room"
                            />
                        </Row>

                        <Row>
                            <Col span={24}>
                                <div className={cx('room__content--main')}>
                                    <Form
                                        labelCol={{
                                            span: 24,
                                        }}
                                        wrapperCol={{
                                            span: 20,
                                        }}
                                        layout="horizontal"
                                        disabled={componentDisabled}
                                        style={{
                                            maxWidth: '100%',
                                        }}
                                        onFinish={onFinish}
                                        name="formName"
                                        form={form}
                                    >
                                        <Row>
                                            <Col span={18}>
                                                <Form.Item
                                                    required
                                                    name={'roomName'}
                                                    label="Room Name"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Room Name is required',
                                                        },
                                                    ]}
                                                >
                                                    <Input name="roomName" placeholder="Type your room name" />
                                                </Form.Item>
                                                <Form.Item
                                                    required
                                                    name={'roomType'}
                                                    label="Room Type"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Room Type is required',
                                                        },
                                                    ]}
                                                >
                                                    <Radio.Group name="roomType">
                                                        <Radio value="single"> Single </Radio>
                                                        <Radio value="double"> Double </Radio>
                                                    </Radio.Group>
                                                </Form.Item>
                                                <Form.Item
                                                    required
                                                    name="roomAmenity"
                                                    label="Room Amenity"
                                                    rules={[
                                                        {
                                                            required: false,
                                                            message: 'Please select your favourite colors!',
                                                            type: 'array',
                                                        },
                                                    ]}
                                                >
                                                    <Select
                                                        mode="multiple"
                                                        placeholder="Please select favourite colors"
                                                        // notFoundContent={"There is no amenity available"}
                                                    >
                                                        {amenity?.map((amenityItem) => {
                                                            return (
                                                                <Select.Option value={amenityItem.amenityName}>
                                                                    {amenityItem.amenityName}
                                                                </Select.Option>
                                                            );
                                                        })}
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item
                                                    required
                                                    name={'roomRank'}
                                                    label="Room Rank"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Room Rank is required',
                                                        },
                                                    ]}
                                                >
                                                    <Radio.Group name="roomRank">
                                                        <Radio value="normal">Normal</Radio>
                                                        <Radio value="superior"> Superior </Radio>
                                                    </Radio.Group>
                                                </Form.Item>
                                                <Row>
                                                    <Col span={6}>
                                                        <Form.Item
                                                            required
                                                            name={'roomCreatedAt'}
                                                            label="Create at"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Room Created At is required',
                                                                },
                                                            ]}
                                                        >
                                                            <DatePicker name="roomCreatedAt" style={{ width: '80%' }} />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Form.Item
                                                            required
                                                            label="Room Price"
                                                            name={'roomPrice'}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Room Price is required',
                                                                },
                                                            ]}
                                                        >
                                                            <InputNumber
                                                                style={{ width: '100%' }}
                                                                name="roomPrice"
                                                                placeholder="Type your room price"
                                                                formatter={(value) => {
                                                                    return value.toLocaleString();
                                                                }}
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>

                                                <Form.Item name={'roomDesc'} label="Room Description">
                                                    <TextArea
                                                        placeholder="Type your room description"
                                                        name="roomDesc"
                                                        rows={4}
                                                    />
                                                </Form.Item>
                                                <Row>
                                                    <Col
                                                        span={24}
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                        }}
                                                    >
                                                        <button className={cx('add__room--btn')}>
                                                            Create New Room
                                                        </button>
                                                        <button className={cx('add__room--btn')} type="reset">
                                                            Reset
                                                        </button>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Form>
                                    <Row>
                                        <Col span={24}>
                                            <Col span={12}>
                                                <Checkbox
                                                    checked={componentDisabled}
                                                    onChange={(e) => setComponentDisabled(e.target.checked)}
                                                >
                                                    Disabled
                                                </Checkbox>
                                            </Col>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                        <img
                            alt="example"
                            style={{
                                width: '100%',
                            }}
                            src={previewImage}
                        />
                    </Modal>
                </div>
            ) : (
                <Loading heightBlock={'90vh'} />
            )}
        </>
    );
};
export default AddRoom;
