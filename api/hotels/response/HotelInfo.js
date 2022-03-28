// data?.hotels?.hotels this is an array
function HotelInfo (hotel) {
    this.name = hotel?.name;
    this.category = hotel?.categoryName;
    this.zone = hotel?.zoneName;
    this.currency = hotel?.currency;
    this.rooms = [];

    if(hotel?.rooms != null) {
        hotel?.rooms.map(room =>
            this.rooms.push(
                new RoomInfo(room)
            )
        );
    };
}

function RoomInfo (room) {
    this.name = room?.name;
    this.rooms = room?.rooms;
    this.adults = room?.adults;
    this.children = room?.children;
    this.rate = room?.rates[0]?.net;
}

module.exports = HotelInfo;