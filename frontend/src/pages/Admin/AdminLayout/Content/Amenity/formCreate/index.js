import { Form, Input, Modal, Radio } from 'antd';
import FormItem from '../../../../AdminComponent/FormItem';
import axios from 'axios';

const ModalForm = ({
    open,
    onCreate,
    onCancel,
    title = 'Create a new collection',
    okText = 'Create',
    cancelText = 'Cancel',
}) => {
    const [form] = Form.useForm();
    let dayNow;

    const getDayNow = () => {
        const curDate = new Date();
        const curDay = curDate.getDate();
        const curMonth = curDate.getMonth() + 1;
        const curYear = curDate.getFullYear();
        const curDayNow = curDay + '/' + curMonth + '/' + curYear;
        dayNow = curDayNow;
        return dayNow;
    };

    getDayNow();

    return (
        <Modal
            open={open}
            title={title}
            okText={okText}
            onCancel={onCancel}
            // confirmLoading={true}
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        console.log(values);
                        form.resetFields();
                        axios
                            .post('http://localhost:4000/amenity', {
                                amenityName: values.amenityName,
                                roomType: values.roomType,
                                createdAt: dayNow,
                            })
                            .then((response) => console.log(response))
                            .catch((error) => console.log(error));
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <FormItem
                    name="amenityName"
                    label="Amenity Name"
                    rules={[{ required: true, message: 'Please type your amenity name' }]}
                >
                    <Input placeholder="Type your amenity name" />
                </FormItem>
                <FormItem
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
                </FormItem>
            </Form>
        </Modal>
    );
};
export default ModalForm;
