import fecha from "../path/fecha.js";
import HotelDatepicker from "../path/hotel-datepicker.js";

const apiUrl = `https://challenge.thef2e.com/api/thef2e2019/stage6`
let jwt = 'Bearer b3gLSrWwItJYYeRTWYOajZNDPg451lZX0Kvf75ZS3TXpsOrAzXqCqh7yMCL0'
// let id = new URLSearchParams(document.location.search).get("id");
let id = JSON.parse(localStorage.getItem('roomId'));

const axiosConfig = {
    headers: {
        'Authorization': jwt
    }
};

const axiosConfigCT = {
    headers: {
        'Authorization': jwt,
        'Content-Type': 'application/json'
    }
};


// Room
const goBack = document.querySelector('.group-goBack');
goBack.addEventListener('click', (e) => {
    e.preventDefault();
    // console.log(e);
    if (e.target.nodeName !== "A") {
        return;
    } else if (e.target.nodeName === "A") {
        window.location.href = "index.html";
    }
})

const priceOneNight = document.querySelector('.group-priceOneNight');
const roomTypeTitle = document.querySelector('.roomType-title');
const roomIofo = document.querySelector('.js-roomIofo');
const roomTypeThings = document.querySelector('.roomType-things');
const roomTypeOffers = document.querySelector('.roomType-offers');

const resInformationTitle = document.querySelector('.resInformation-title')
const infoTxt = document.querySelector('.js-infoTxt');
const resInformationIcons = document.querySelector('.resInformation-icons');
const resInformationList = document.querySelector('.js-resInformationList');

let roomCheckedDate = [];

function init() {
    getRoomsType();
}
init();


const newAmenities = [
    {
        apiName: "Wi-Fi",
        pageName: "Wifi",
        imgUrl: "./img/icons/wifi.svg"
    },
    {
        apiName: "Breakfast",
        pageName: "早餐",
        imgUrl: "./img/icons/breakfast.svg"
    },
    {
        apiName: "Mini-Bar",
        pageName: "Mini Bar",
        imgUrl: "./img/icons/mini_bar.svg"
    },
    {
        apiName: "Room-Service",
        pageName: "Room Service",
        imgUrl: "./img/icons/Room_Service.svg"
    },
    {
        apiName: "Television",
        pageName: "電話",
        imgUrl: "./img/icons/tel.svg"
    },
    {
        apiName: "Air-Conditioner",
        pageName: "空調",
        imgUrl: "./img/icons/air_conditioner.svg"
    },
    {
        apiName: "Refrigerator",
        pageName: "冰箱",
        imgUrl: "./img/icons/refrigerator.svg"
    },
    {
        apiName: "Sofa",
        pageName: "沙發",
        imgUrl: "./img/icons/sofa.svg"
    },
    {
        apiName: "Great-View",
        pageName: "漂亮視野",
        imgUrl: "./img/icons/view.svg"
    },
    {
        apiName: "Smoke-Free",
        pageName: "全面禁菸",
        imgUrl: "./img/icons/smoking.svg"
    },
    {
        apiName: "Child-Friendly",
        pageName: "適合兒童",
        imgUrl: "./img/icons/child.svg"
    },
    {
        apiName: "Pet-Friendly",
        pageName: "攜帶寵物",
        imgUrl: "./img/icons/pets.svg"
    }
]

let normalDayPrice = JSON.parse(localStorage.getItem('normalDayPrice'));
let holidayPrice = JSON.parse(localStorage.getItem('holidayPrice'));
const carouselInner = document.querySelector('.carousel-inner');

function getRoomsType() {
    axios.get(`${apiUrl}/room/${id}`, axiosConfig)
        .then(res => {
            const roomstyleData = res.data.room;
            console.log(roomstyleData);
            let newAmenitiesStr = '';
            let newResInformationStr = '';

            roomstyleData.forEach(item => {
                let bedType = item.descriptionShort.Bed.toString();
                switch (bedType) {
                    case "Single":
                        bedType = "單人床";
                        break;
                    case "Small Double":
                        bedType = "加大單人床";
                        break;
                    case "Double":
                        bedType = "標準雙人床";
                        break;
                    case "Queen":
                        bedType = "加大雙人床";
                        break;
                    case "Double,Double":
                        bedType = "2張標準雙人床";
                        break;
                    case "Queen,Queen":
                        bedType = "2張加大雙人床";
                        break;
                }


                carouselInner.innerHTML = `
                <div class="carousel-item active">
                    <div class="carousel-sr-photoSet" style="background-image: url(${item.imageUrl[0]});"></div>
                </div>
                <div class="carousel-item">
                    <div class="carousel-sr-photoSet" style="background-image: url(${item.imageUrl[1]});"></div>
                </div>
                <div class="carousel-item">
                    <div class="carousel-sr-photoSet" style="background-image: url(${item.imageUrl[2]});"></div>
                </div>`

                localStorage.setItem('normalDayPrice', JSON.stringify(item.normalDayPrice));
                localStorage.setItem('holidayPrice', JSON.stringify(item.holidayPrice));

                priceOneNight.textContent = `${item.normalDayPrice}`;

                roomTypeTitle.innerHTML = `<h2>${item.name}</h2><span>${item.descriptionShort.GuestMax}人・ ${bedType}・ 附早餐・衛浴${item.descriptionShort["Private-Bath"]}間・${item.descriptionShort.Footage}平方公尺</span>`

                roomIofo.innerHTML = ` <p class="roomType-time">平日（一～四）價格：${item.normalDayPrice}&ensp;/&ensp;假日（五〜日）價格：${item.holidayPrice}
                <br>
                入住時間：${item.checkInAndOut.checkInEarly}（最早）/&ensp;${item.checkInAndOut.checkInLate}（最晚）
                <br>
                退房時間：${item.checkInAndOut.checkOut}</p>`

                const typeThings = item.description.split('.');
                typeThings.pop();

                let roomThings = '';
                typeThings.forEach(item => {
                    roomThings += `<li>・${item}.</li>`
                })

                roomTypeThings.innerHTML = roomThings;

                // roomTypeThings.innerHTML = `<p>${item.description}</p>`

                // booking page
                resInformationTitle.innerHTML = `<h2>${item.name}</h2><hr>`

                infoTxt.innerHTML = `<p>${item.descriptionShort.GuestMax}人・ ${bedType}・附desLine早餐・ 衛浴${item.descriptionShort["Private-Bath"]}間・${item.descriptionShort.Footage}平方公尺</p>
                <p>平日（一～四）價格：${item.normalDayPrice}&ensp;/&ensp;假日（五〜日）價格：${item.holidayPrice}</p>`

                resInformationList.innerHTML = `・入住時間：最早${item.checkInAndOut.checkInEarly}，最晚${item.checkInAndOut.checkInLate}；退房時間：${item.checkInAndOut.checkOut}，請自行確認行程安排。`

                Object.entries(item.amenities).forEach(([key, value]) => {
                    newAmenities.forEach(newitem => {
                        // console.log(key);
                        // console.log(value);
                        // console.log(newitem.apiName);

                        if (key === newitem.apiName) {
                            const newStr = (value === true) ? (newAmenitiesStr += `<li class="offers-things">
                            <img class="things-icon" src="${newitem.imgUrl}" alt="${key}">
                            <img class="things-whether" src="./img/icons/icons8-ok.svg" alt="yes">
                            <span class="things-txt">${newitem.pageName}</span>
                            </li>`) : (newAmenitiesStr += `<li class="offers-things opacity" data-icon="Room-Service">
                            <img class="things-icon" src="${newitem.imgUrl}" alt="${key}">
                            <img class="things-whether" src="./img/icons/icons8-cancel.svg" alt="no">
                            <span class="things-txt">${newitem.pageName}</span>
                            </li>`)

                            if (value === true) {
                                newResInformationStr += `<li class="resInformation-iconGroup">
                            <img class="things-icon" src="${newitem.imgUrl}" alt="${key}">
                            <span class="things-txt">${newitem.pageName}</span></li>`
                            }
                        }
                        roomTypeOffers.innerHTML = newAmenitiesStr;
                        resInformationIcons.innerHTML = newResInformationStr;
                    })
                })
            })

            const roomBookingDate = res.data.booking;

            roomBookingDate.forEach(item => {
                roomCheckedDate.push(item.date);
            })
            initRangePicker();

        })
        .catch(err => {
            console.log(err);
        });
}


console.log(roomCheckedDate);



//datapicker 套件
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const after90Days = new Date();
after90Days.setDate(tomorrow.getDate() + 90);

const queryDateContent = document.querySelector('.queryDate-content');
const totalNightPage = document.querySelector('.js-totalNight');

let daysData = [];

const initRangePicker = () => {
    let pickerDate = [];
    const input = document.querySelector("#queryDateInput-id");
    input.value = `${fecha.format(tomorrow, "YYYY-MM-DD")}`;

    const datepicker = new HotelDatepicker(input, {
        onOpenDatepicker: function () {
            // console.log("Datepicker opened!");
        },
        onDayClick: function () {
            // console.log("Day clicked!");
            console.log(datepicker.getValue());
        },
        onSelectRange: function () {
            // console.log(datepicker.getValue());

            pickerDate = ((datepicker.getValue()).split(','));
            let startDay = pickerDate[0].trim();
            let endDay = pickerDate[1].trim();

            let totalNight = datepicker.getNights();

            localStorage.setItem('startTimeInfo', JSON.stringify(startDay));
            localStorage.setItem('endTimeInfo', JSON.stringify(endDay));
            localStorage.setItem('totalNightInfo', JSON.stringify(totalNight));


            let newStartDay = new Date(startDay);
            let newEndDay = new Date(endDay);
            // console.log(typeof(new Date(startDay)));
            // console.log(new Date(startDay));
            // console.log(newEndDay - newStartDay);
            daysData = [];
            while ((newEndDay - newStartDay) >= 0) {
                const year = newStartDay.getFullYear();
                const month = (newStartDay.getMonth() + 1).toString().length == 1 ? "0" + (newStartDay.getMonth() + 1).toString() : (newStartDay.getMonth() + 1).toString();
                // console.log(month);
                // console.log(typeof(month));
                const day = newStartDay.getDate().toString().length == 1 ? "0" + newStartDay.getDate().toString() : newStartDay.getDate().toString();
                // console.log(typeof (day));
                // console.log(year + "-" + month + "-" + day);

                daysData.push(year + "-" + month + "-" + day);
                newStartDay.setDate(newStartDay.getDate() + 1);
            }
            daysData.pop();

            console.log(daysData);


            //假日
            let weekendTotal = 0;
            //平日
            let weekdayTotal = 0;


            daysData.forEach(item => {
                let pickerWeek = new Date(item).getDay();
                if (pickerWeek > 0 && pickerWeek < 5) {
                    weekdayTotal += 1;
                } else if (pickerWeek = 1 || pickerWeek > 4) {
                    weekendTotal += 1;
                }
            })

            console.log(weekendTotal); //假日
            console.log(weekdayTotal);//平日

            localStorage.setItem('weekendTotalInfo', JSON.stringify(weekendTotal));
            localStorage.setItem('weekdayTotalInfo', JSON.stringify(weekdayTotal));

            priceOneNight.textContent = (normalDayPrice * (weekdayTotal)) + (holidayPrice * (weekendTotal));
            localStorage.setItem('priceNightInfo', JSON.stringify(priceOneNight.textContent));

            totalNightPage.textContent = `${totalNight}晚`;

        },
        startDate: `${fecha.format(tomorrow, "YYYY-MM-DD")}`,
        endDate: `${fecha.format(after90Days, "YYYY-MM-DD")} `,
        disabledDates: roomCheckedDate,
        autoClose: false,
        preventContainerClose: true,
        moveBothMonths: true,
        showTopbar: false,
        container: queryDateContent
    });

    datepicker.open();
    console.log(datepicker.getDatePicker());
};

/* ---以上 datapicker 套件--- */



// booking page 切換
const groupgBtn = document.querySelector('.group-btn');
const bookingBox = document.querySelector('.bookingBox');
const cancelPage = document.querySelector('.js-cancelPage');
const bookingDays = document.querySelector('.booking-days');
const totalPrice = document.querySelector('.js-bookingTotalPrice');

let startTime = document.querySelector("#bookingStart-id");
let endtTime = document.querySelector("#bookingEnd-id");

groupgBtn.addEventListener('click', btnPicker);
function btnPicker() {
    let weekendTotalDays = JSON.parse(localStorage.getItem('weekendTotalInfo'));
    let weekdayTotalDays = JSON.parse(localStorage.getItem('weekdayTotalInfo'));

    bookingBox.setAttribute("style", "display:block;");

    let startPicker = JSON.parse(localStorage.getItem('startTimeInfo'));
    let endPicker = JSON.parse(localStorage.getItem('endTimeInfo'));
    let allNightDays = JSON.parse(localStorage.getItem('totalNightInfo'));

    let totalDays = allNightDays + 1;

    startTime.value = startPicker;
    endtTime.value = endPicker;
    bookingDays.textContent = `${totalDays} 天，${allNightDays} 晚 (含 ${weekdayTotalDays} 晚平日，${weekendTotalDays} 晚假日)`;

    let priceNight = JSON.parse(localStorage.getItem('priceNightInfo'));
    totalPrice.textContent = `$ ${priceNight} 元`;
}

cancelPage.addEventListener('click', e => {
    e.preventDefault;
    bookingBox.setAttribute("style", "display:none;");
})


bookingBox.addEventListener('click', e => {
    // console.log(e.target.className);
    if (e.target.className !== "bookingBox") {
        return;
    } else if (e.target.className === "bookingBox") {
        bookingBox.setAttribute("style", "display:none;");
    }
});


//booking填資料頁面
const successBooking = document.querySelector('.js-successBooking');
const failBooking = document.querySelector('.js-failBooking');
const bookingBtn = document.querySelector('.js-checkBtn');
const bookingName = document.querySelector('.js-bookingName');
const bookingNumber = document.querySelector('.js-bookingNumber');

bookingBtn.addEventListener('click', bookingInfo)
function bookingInfo() {
    if (bookingName.value.trim() === "" && bookingNumber.value.trim() === "") {
        Swal.fire('欄位不可為空!請輸入姓名與電話!')
        return;
    } else if (bookingName.value.trim() === "") {
        Swal.fire('請輸入姓名!')
        return;
    } else if (bookingNumber.value.trim() === "") {
        Swal.fire('請輸入電話!')
        return;
    }
    initRangePicker();

    axios.post(`${apiUrl}/room/${id}`,
        {
            "name": bookingName.value.trim(),
            "tel": bookingNumber.value.trim(),
            "date": daysData
        }, axiosConfigCT)
        .then(function (res) {
            console.log(res);
            // console.log(res.data.booking)
            if (res.status === 200) {
                bookingBox.setAttribute("style", "display:none;");
                successBooking.setAttribute("style", "display:block;");
            }
        })
        .catch(function (err) {
            console.log(err);
            // console.log(err.response.status);
            if (err.response.status === 400) {
                bookingBox.setAttribute("style", "display:none;");
                failBooking.setAttribute("style", "display:block;");
                return;
            } else {
                console.log('系統其他錯誤');
            }
        });


    bookingName.value = '';
    bookingNumber.value = '';

}


