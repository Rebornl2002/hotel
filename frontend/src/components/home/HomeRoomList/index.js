/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import images from '../../../assets/images';
import style from './HomeRoomList.module.scss';
import axios from 'axios';

const cx = classNames.bind(style);

function HomeRoomList() {
    const [roomList, setRoomList] = useState({});

    const roomsImg = [
        'https://cdn.alongwalk.info/vn/wp-content/uploads/2022/02/23014734/image-10-hinh-anh-khach-san-du-khach-muon-duoc-nhin-thay-nhat-164553045440951.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTPK-W0nNg6qtNIFMJK7U3iuCLA9cT81is2GxSMV9QAA&s',
        'https://images.squarespace-cdn.com/content/v1/5aadf482aa49a1d810879b88/1626698419120-J7CH9BPMB2YI728SLFPN/1.jpg',
        'https://kksapahotel.com/uploads/images/VQK_2153%20(1).jpg',
        'https://storage-vnportal.vnpt.vn/cbg-khdn/1602/Anhmoi2022/2.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR7z6nKpp00CaZrsNDPHvpBYHHsOSl1xGbGubwlxAW4w&s',
        'https://www.hotelgrandsaigon.com/wp-content/uploads/sites/227/2017/12/GRAND_SEDK_01.jpg',
        'https://images.squarespace-cdn.com/content/v1/5aadf482aa49a1d810879b88/1626698584182-YPDVH4ZANFBZSEPY7AEM/2.jpg',
        'https://storage-vnportal.vnpt.vn/cbg-khdn/1602/Anhmoi2022/6.jpg',
        'https://media-cdn.tripadvisor.com/media/photo-s/1d/30/29/68/hinh-nh-phong-khach-s.jpg',
        'https://www.hotelgrandsaigon.com/wp-content/uploads/sites/227/2017/12/GRAND_PDLK_01.jpg',
    ];

    const handleGetRoomList = async () => {
        axios
            .get('http://localhost:4000/room')
            .then((response) => setRoomList(response.data.data))
            .catch((error) => console.error(error));
    };
    useEffect(() => {
        handleGetRoomList();

        return () => {};
    }, []);

    return (
        <div className={cx('grid')}>
            <div className={cx('row')}>
                {/* Map data */}
                {Object.keys(roomList).map((roomKey, index) => {
                    const roomData = roomList[roomKey];

                    return (
                        <div key={`home__room__list__item__${roomKey}`} className={cx('col c-12 m-6 l-3')}>
                            <Link to={`/rooms/${roomData.roomName}`} className={cx('room__list__item__wrapper')}>
                                <img
                                    className={cx('room__list__item__img')}
                                    alt="Đã xảy ra lỗi"
                                    src={roomsImg[index]}
                                />
                                <div
                                    className={cx('room__list__item__overlay__wrapper')}
                                    onClick={() => localStorage.setItem('indexImg', JSON.stringify(index))}
                                >
                                    <div className={cx('room__list__item__overlay')}>
                                        <div className={cx('room__list__item__overlay__room--classification')}>
                                            {roomData.roomRank === 'superior' ? 'Phòng cao cấp' : 'Phòng thường'}
                                        </div>
                                        <div className={cx('room__list__item__overlay--bottom')}>
                                            <div className={cx('room__list__item__overlay--bottom__room--price')}>
                                                <div
                                                    className={cx(
                                                        'room__list__item__overlay--bottom__room--price__label',
                                                    )}
                                                >
                                                    Giá tiền:
                                                </div>
                                                <div
                                                    className={cx(
                                                        'room__list__item__overlay--bottom__room--price__value',
                                                    )}
                                                >
                                                    {`${roomData.roomPrice} VNĐ/đêm`}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default HomeRoomList;
