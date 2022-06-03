const apiUrl = `https://challenge.thef2e.com/api/thef2e2019/stage6`
let jwt = 'Bearer b3gLSrWwItJYYeRTWYOajZNDPg451lZX0Kvf75ZS3TXpsOrAzXqCqh7yMCL0'
const axiosConfig = {
    headers: {
        'Authorization': jwt
    }
};

const roomStyle = document.querySelector(".roomStyle");

function init() {
    getRoomsList();
}
init();

//get所有房型+渲染
function getRoomsList() {
    axios.get(`${apiUrl}/rooms`, axiosConfig)
        .then(res => {
            const roomData = res.data.items;
            console.log(roomData);
            let str = '';
            roomData.forEach(item => {
                str += `<li class="roomStyle_content" style="background-image: url(${item.imageUrl}" data-id="${item.id}")>
                <a href="roomType.html">${item.name}</a>
            </li>`
            })
            roomStyle.innerHTML = str;
        })
        .catch(err => {
            console.log(err);
        });
}

roomStyle.addEventListener('click', saveIdData);
function saveIdData(e) {
    const id = e.target.closest('li').dataset.id;
    localStorage.setItem('roomId', JSON.stringify(id));
}

