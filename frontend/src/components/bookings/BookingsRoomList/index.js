import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';

import images from '../../../assets/images';

import style from './BookingsRoomList.module.scss';

const cx = classNames.bind(style);

function BookingsRoomList({ roomList }) {
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
    return roomList ? (
        <div className={cx('bookings__room__list', 'grid')}>
            <div className={cx('row')}>
                {Object.keys(roomList).map((roomKey) => {
                    const roomData = roomList[roomKey];
                    return (
                        <div key={`bookings__room__list__item${roomKey}`} className={cx('col c-12 m-4 l-3')}>
                            <Link
                                to={`/rooms/${roomData.roomName}`}
                                className={cx('room__list__item__wrapper')}
                                onClick={() => localStorage.setItem('indexImg', JSON.stringify(Number(roomKey)))}
                            >
                                <div className={cx('item__img__wrapper')}>
                                    <img className={cx('item__img__tag')} alt="Đã xảy ra lỗi" src={roomsImg[roomKey]} />
                                    <div className={cx('item__img__overlay__wrapper')}>
                                        <div className={cx('item__img__overlay')}></div>
                                    </div>
                                    {roomData?.roomRank === 'superior' && (
                                        <img
                                            className={cx('item__img__classification--img')}
                                            src={images.premiumIcon}
                                        />
                                    )}
                                </div>
                                <div className={cx('item__detail__wrapper')}>
                                    <div className={cx('item__detail__name')}>
                                        <div className={cx('item__detail__name--label', 'label')}>Tên phòng:</div>
                                        <div className={cx('item__detail__name--value', 'value')}>
                                            {roomData?.roomName}
                                        </div>
                                    </div>
                                    <div className={cx('item__detail__desc')}>
                                        <div className={cx('item__detail__desc__type')}>
                                            {roomData?.roomType === 'single' ? 'Phòng đơn' : 'Phòng đôi'}
                                        </div>
                                        <div className={cx('item__detail__desc__classification')}>
                                            {roomData?.roomRank === 'superior' ? 'Phòng cao cấp' : 'Phòng bình dân'}
                                        </div>
                                    </div>
                                    <div className={cx('item__detail__price')}>
                                        <div className={cx('item__detail__price__label', 'label')}>Giá :</div>
                                        <div className={cx('item__detail__price__value', 'value')}>
                                            {`${roomData?.roomPrice} VNĐ/đêm`}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    ) : null;
}

export default BookingsRoomList;
