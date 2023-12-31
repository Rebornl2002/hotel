import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

import classNames from 'classnames/bind';
import { Button } from 'antd';

import useRequireSignIn from '../../components/common/useRequireSignIn';

import style from './Room.module.scss';
import useBooking from '../../components/room/useBooking';
import { Grid, Skeleton, Stack } from '@mui/material';
import axios from 'axios';

const cx = classNames.bind(style);

function Room() {
    const { roomId } = useParams();

    const [roomData, setRoomData] = useState({});
    const [user, setUser] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const { handleToggleTippy, requireSignInRender } = useRequireSignIn();
    const { handleToggleBookingTippy, bookingTippyRender } = useBooking(roomId, roomData);

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

    const handleGetRoomData = async () => {
        // const roomPath = `admin/create-room/rooms/${roomId}`;

        // const roomData = await handleGetData(roomPath).then((snapshot) => snapshot.val() || {});
        // setRoomData(roomData);

        // // get the rating list data of this room
        // if (roomData.roomRatings) {
        //   const promises = Object.keys(roomData.roomRatings).map((ratingKey) =>
        //     handleGetData(`ratings/${ratingKey}`).then((snapshot) => snapshot.val())
        //   );

        //   Promise.all(promises).then((res) => {
        //     res && setRatings(res);
        //   });
        // }
        axios
            .get(`http://localhost:4000/room/${roomId}`)
            .then((res) => setRoomData(res.data.data))
            .catch((err) => console.log(err));
    };

    const indexImg = localStorage.getItem('indexImg');

    const handleGetAvgStar = (ratings) => {
        if (!ratings) return;

        let initialAvg = 0;
        const result = Object.keys(ratings).reduce((acc, rating) => acc + ratings[rating].data.star, initialAvg);

        const avg = Math.round((result / Object.keys(ratings).length) * 10) / 10;
        return avg;
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user.uid);
            }
        });

        handleGetRoomData().then(() => {
            setIsLoaded(true);
        });

        return () => {};
    }, []);

    return isLoaded ? (
        <div className={cx('room__wrapper--padding')}>
            <div className={cx('room__wrapper')}>
                <div className={cx('room__header__wrapper')}>
                    <h1 className={cx('room__header__hotel--name')}>Khách sạn MKTHM</h1>
                    <div className={cx('room__header__room--name')}>
                        <div className={cx('room__header__room--name__label')}>Phòng:</div>
                        <div className={cx('room__header__room--name__title')}>{roomData.roomName}</div>
                    </div>
                </div>
                <div className={cx('room__info__wrapper')}>
                    {/* room images */}
                    <div className={cx('room__info__carousel__wrapper')}>
                        <img alt="Đã xảy ra lỗi" src={roomsImg[indexImg]} />
                    </div>

                    {/* room detail */}
                    <div className={cx('room__info__detail__wrapper')}>
                        <div className={cx('room__info__detail__price__wrapper', 'detail-item')}>
                            <div className={cx('room__info__detail__price__label', 'label')}>Giá tiền:</div>
                            <div className={cx('room__info__detail__price__value', 'value--orange')}>
                                {`${roomData.roomPrice} VNĐ/đêm`}
                            </div>
                        </div>
                        <div className={cx('room__info__detail__type__wrapper', 'detail-item')}>
                            <div className={cx('room__info__detail__type__label', 'label')}>Loại phòng:</div>
                            <div className={cx('room__info__detail__type__value', 'value--orange')}>
                                {roomData.roomType === 'single' ? 'Phòng đôi' : 'Phòng đơn'}
                            </div>
                        </div>
                        <div className={cx('room__info__detail__classification__wrapper', 'detail-item')}>
                            <div className={cx('room__info__detail__classification__label', 'label')}>Hạng phòng:</div>
                            <div className={cx('room__info__detail__classification__value', 'value--orange')}>
                                {roomData.roomRank === 'superior' ? 'Phòng cao cấp' : 'Phòng thường'}
                            </div>
                        </div>
                        <div className={cx('room__info__detail__desc__wrapper', 'detail-item')}>
                            <div className={cx('room__info__detail__desc__label', 'label')}>
                                Mô tả:
                                <div className={cx('room__info__detail__desc__value')}>{roomData.roomDesc}</div>
                            </div>
                        </div>
                    </div>

                    {/* bookings */}
                    <div className={cx('booking__btn__wrapper')}>
                        <Button
                            type="primary"
                            ghost
                            danger
                            onClick={() => {
                                user ? handleToggleBookingTippy() : handleToggleTippy();
                            }}
                        >
                            Đặt phòng
                        </Button>
                    </div>
                </div>
            </div>

            {/* tippy render  */}
            {!user ? requireSignInRender : bookingTippyRender}
        </div>
    ) : (
        <Stack padding={[1, 4, 1, 4]}>
            <Skeleton variant="text" height={80}></Skeleton>
            <Skeleton variant="text" height={80}></Skeleton>
            <Skeleton variant="rectangular" height={300}></Skeleton>
            <Skeleton variant="text" height={80}></Skeleton>
            <Skeleton variant="text" height={80}></Skeleton>
            {/* <Skeleton variant="rectangular" width={40} height={80}></Skeleton> */}
            <Grid spacing={2} container>
                <Grid item xs={1}>
                    <Skeleton variant="circular" width={80} height={80}></Skeleton>
                </Grid>
                <Grid item xs={11}>
                    <Skeleton variant="text" height={80}></Skeleton>
                </Grid>
            </Grid>
        </Stack>
    );
}

export default Room;
