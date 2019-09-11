const socket = io();


// Elements
const $roomsOnline = document.querySelector('#rooms-select');
const $roomInput = document.querySelector('#room-input');

// Templates
const roomsOnlineTemplate = document.querySelector('#room-select-template').innerHTML;

// Options for emit
const { rooms, users } = Qs.parse(location.search, { ignoreQueryPrefix: true });

socket.on('roomList', ({ rooms }) => {
    const html = Mustache.render(roomsOnlineTemplate, {
        rooms
    });

    $roomsOnline.innerHTML = html;
});

// doropdown list function
const listEvents = ['click','change'];
listEvents.forEach((item) => {
    $roomsOnline.addEventListener(item, (e) => {
        e.preventDefault();

        const roomSelectedFromList = $roomsOnline.options[$roomsOnline.selectedIndex].value;
        $roomInput.value = roomSelectedFromList;
    });
});

// socket on disconnect a user is removed from room
// thus where usercount is 0, room needs to get removed from array
// socket.emit('join', {
//     rooms
// }, (error) => {
//     if(error) {
//         alert(error);
//         location.href = '/';
//     }
// });