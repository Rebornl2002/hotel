// react import
import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';

// ant design import
import { Button, Menu } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faMoneyBill, faRankingStar, faTrash, faUsers } from '@fortawesome/free-solid-svg-icons';

import BookingsRoomList from '../../components/bookings/BookingsRoomList';
import style from './Bookings.module.scss';
import { handleGetData } from '../../utils/database';
import axios from 'axios';

const getItem = (label, key, icon, children, type) => {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
};

const menu = {
    roomRank: [
        getItem('Hạng phòng', 'roomRank', <FontAwesomeIcon icon={faRankingStar} />, [
            getItem('Phòng bình dân', 'normal'),
            getItem('Phòng cao cấp', 'superior'),
        ]),
    ],

    roomType: [
        getItem('Loại phòng', 'roomType', <FontAwesomeIcon icon={faUsers} />, [
            getItem('Phòng đơn', 'single'),
            getItem('Phòng đôi', 'double'),
        ]),
    ],
};

const cx = classNames.bind(style);

function Bookings() {
    const [isSearching, setIsSearching] = useState(false);
    const [roomList, setRoomList] = useState(null);
    const [defaultRoomList, setDefaultRoomList] = useState(null);
    const [data, setData] = useState(null);

    const [query, setQuery] = useState({
        roomRank: '',
        roomType: '',
        roomPrice: '',
    });

    const handleSelect = (type, key) => {
        setQuery((prev) => ({ ...prev, [type]: key }));
    };

    const handleClearQuery = () => {
        setQuery((prev) => ({ ...prev, roomRank: '', roomType: '', roomPrice: '' }));
    };

    // query

    const handleSearch = async (query) => {
        const allRooms = { ...defaultRoomList };

        if (!allRooms) return;

        // check if query is empty => set room list to default
        const isQueryEmpty = Object.values(query).every((queryValue) => !queryValue);

        if (isQueryEmpty) {
            setRoomList(defaultRoomList);
        } else {
            if (query.roomPrice === '') {
                if (query.roomType === '') {
                    let newData = data.filter((e) => {
                        return e.roomRank === query.roomRank;
                    });
                    setRoomList(newData);
                } else if (query.roomRank === '') {
                    let newData = data.filter((e) => {
                        return e.roomType === query.roomType;
                    });
                    setRoomList(newData);
                } else {
                    let newData = data.filter((e) => {
                        return e.roomType === query.roomType && e.roomRank === query.roomRank;
                    });
                    setRoomList(newData);
                }
            }
        }

        setIsSearching(false);
    };

    const handleGetRoomsData = async () => {
        // const roomsPath = `admin/create-room/rooms`;
        // const roomList = await handleGetData(roomsPath).then((snapshot) => snapshot.val() || {});
        // setDefaultRoomList(roomList);
        // setRoomList(roomList);
        axios
            .get('http://localhost:4000/room')
            .then((response) => {
                setDefaultRoomList(response.data.data);
                setRoomList(response.data.data);
                setData(response.data.data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        // get all rooms
        handleGetRoomsData();

        return () => {};
    }, []);

    return (
        <div className={cx('bookings__wrapper')}>
            <div className={cx('bookings__selector__wrapper')}>
                {Object.keys(menu).map((itemKey) => {
                    const itemData = menu[itemKey];
                    return (
                        <Menu
                            key={`bookings__selector__menu__${itemKey}`}
                            mode="inline"
                            theme="dark"
                            items={itemData}
                            selectedKeys={query[itemKey]}
                            onClick={(value) => {
                                const key = value.key === query[itemKey] ? '' : value.key;
                                handleSelect(itemKey, key);
                            }}
                        />
                    );
                })}

                <div className={cx('bookings__selector__button__wrapper')}>
                    <Button
                        type="primary"
                        danger
                        onClick={() => {
                            handleClearQuery();
                        }}
                    >
                        Xóa bộ lọc <FontAwesomeIcon icon={faTrash} />
                    </Button>
                    <Button
                        type="primary"
                        loading={isSearching}
                        onClick={() => {
                            setIsSearching(true);
                            handleSearch(query);
                        }}
                    >
                        Tìm kiếm <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Button>
                </div>
            </div>
            {roomList && Object.keys(roomList).length > 0 ? (
                <BookingsRoomList roomList={roomList} />
            ) : (
                <h3 className={cx('')}>Không có phòng phù hợp với tìm kiếm của bạn</h3>
            )}
        </div>
    );
}

export default Bookings;
