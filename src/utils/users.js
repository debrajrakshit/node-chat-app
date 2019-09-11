const users = [];
const rooms = [];

// addUser, removeUser, getUser, getUsersInRoom

const addUser = ({ id, username, room }) => {
    // clean the data
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    // validate the data
    if (!username || !room) {
        return {
            error: 'Username and room are required!'
        }
    }

    // check for exisiting user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username;
    });

    // validate username
    if(existingUser) {
        return {
            error: 'Username is in use!'
        }
    }

    // store user
    const user = { id, username, room };
    users.push(user);

    //store rooms
    // check if room is already exists
    // console.log('before: ', rooms);
    let roomExists = false;
    if(rooms.length > 0) {
        rooms.forEach((object) => {
            if(object.room === room){
                roomExists = true;
            }
        });
    }
    if(roomExists === false){
        rooms.push({ room });
    }

    // console.log(rooms.length);
    // const roomAdd = { room };
    
    // console.log('Active rooms: ', getActiveRooms());
    // console.log('Update rooms: ', deleteInactiveRooms());

    return { user };
}

const removeUser = (id) => {
    const index = users.findIndex((user) => {
        return user.id === id;
    });

    if(index !== -1 ){
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => {
    const user = users.find((user) => {
        return user.id === id;
    });

    return user;
}

const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase();
    return users.filter((user) => user.room === room );
}

// add active rooms
const getActiveRooms = (err, res) => {
    if(err){
        return err;
    }
    else{
        return { rooms };
    }
}

// remove inactive rooms
const deleteInactiveRooms = (err, res) => {
    // to be done
    // should remove room when no user in the room
    if(err){
        return err;
    }
    else{
        // console.log('users: ', users);
        // console.log('rooms', rooms);

        rooms.forEach((object) => {
            let userCount = 0;
            let currentRoom = object.room;

            users.forEach((user) => {
                if(user.room === currentRoom){
                    userCount ++;
                }
            });

            // console.log(currentRoom, userCount);

            if(userCount === 0){
                // console.log('room deleted', currentRoom);
                rooms.splice(currentRoom);
            }

        });

        return { rooms };
    }
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom,
    getActiveRooms,
    deleteInactiveRooms
}