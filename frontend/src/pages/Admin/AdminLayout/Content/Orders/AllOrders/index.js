import { Col, Row, Table } from 'antd';
import classNames from 'classnames/bind';
import styles from './AllOrders.module.scss';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { handleGetData, handleGetDataRef } from '../../../../../../utils/database';
import { useEffect, useState } from 'react';
import ItemTitle from '../../../../AdminComponent/ItemTitle';
import Loading from '../../../../AdminComponent/Loading/Loading';
import FilterItem from '../../../../AdminComponent/FilterItem';
import { ALL_ORDER_COLUMN } from '../../../../constants/constants';
import { onValue } from 'firebase/database';
import { ToastError } from '../../../../../../utils/toast';
import axios from 'axios';

let cx = classNames.bind(styles);

const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const AllOrders = () => {
    const [changeData, setChangeData] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [listOrders, setListOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getAllOrders = async () => {
        setIsLoading(true);
        axios
            .get('http://localhost:4000/order')
            .then((response) => {
                setListOrders(response.data.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                ToastError('Opps. Something went wrong. Remove order failed !!');
            });
    };

    useEffect(() => {
        getAllOrders();
    }, []);

    return (
        <div className={cx('all__order--container')}>
            <div className={cx('all__order--body')}>
                <Row>
                    <Col span={24}>
                        {!isLoading ? (
                            <Table
                                columns={ALL_ORDER_COLUMN}
                                dataSource={isSearch ? changeData : listOrders}
                                onChange={onChange}
                            />
                        ) : (
                            <Loading />
                        )}
                    </Col>
                </Row>
            </div>
        </div>
    );
};
export default AllOrders;
