// ============================================================================
// db.js - Hotel Asgard Central Database Engine & CRUD Controller
// Guardian: Heimdall | Hotel: Hotel Asgard (The Realm of the Gods)
// ============================================================================

// Default Accounts
const DEFAULT_USERS = [
    {
        id: "usr_guest_01",
        username: "guest",
        password: "password123",
        role: "customer",
        name: "Thor Odinson",
        realm: "Asgard Crown Realm",
        avatar: "⚡",
        phone: "+99 800-MJOLNIR"
    },
    {
        id: "usr_guest_02",
        username: "loki",
        password: "password123",
        role: "customer",
        name: "Loki Laufeyson",
        realm: "Jotunheim / Asgard",
        avatar: "🐍",
        phone: "+99 800-MISCHIEF"
    },
    {
        id: "usr_admin_01",
        username: "admin",
        password: "admin123",
        role: "owner",
        name: "Heimdall, Bifrost Gatekeeper",
        realm: "Himinbjorg Watchtower",
        avatar: "👁️",
        phone: "+99 800-BIFROST"
    }
];

// Default Celestial Chambers (Rooms)
const DEFAULT_ROOMS = [
    {
        id: "room_101",
        number: "101",
        name: "Valhalla Royal Penthouse",
        type: "Royal Suite",
        price: 350,
        capacity: 4,
        status: "Available",
        amenities: ["Bifrost View", "Mead Fountain", "Golden Balcony", "Heated Thermal Bath"],
        desc: "The highest chamber in Hotel Asgard, blessed by Odin with panoramic views of the Nine Realms and starlit constellations.",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "room_102",
        number: "102",
        name: "Bifrost Prismatic Observatory",
        type: "Deluxe Observatory",
        price: 260,
        capacity: 2,
        status: "Available",
        amenities: ["Prismatic Skylight", "Hofund Key Access", "Cosmic Stargazing Deck"],
        desc: "Overlooking the rainbow bridge itself. Experience pure celestial aurora lighting and uninterrupted peace under Heimdall's gaze.",
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "room_201",
        number: "201",
        name: "Einherjar Grand Warrior Chamber",
        type: "Grand Hall",
        price: 180,
        capacity: 3,
        status: "Available",
        amenities: ["Gilded Fireplace", "Valkyrie Feasting Table", "Armory Rack"],
        desc: "Furnished with royal Asgardian oak, bronzed armor accents, and a crackling golden flame to warm honored warriors.",
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "room_202",
        number: "202",
        name: "Valkyrie Celestial Haven",
        type: "Executive Suite",
        price: 210,
        capacity: 2,
        status: "Available",
        amenities: ["Feather-soft Silk Bed", "Private Terrace", "Herbal Elixir Bar"],
        desc: "A serene haven crafted for swift rest and divine relaxation with silk draperies woven in the colors of the northern lights.",
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "room_301",
        number: "301",
        name: "Mjolnir Thunder Sanctum",
        type: "Standard Deluxe",
        price: 120,
        capacity: 2,
        status: "Available",
        amenities: ["Acoustic Soundproofing", "Enchanted Hearth", "Stone Tub"],
        desc: "A solid bedrock sanctuary imbued with pure grounding energy for deep, dreamless restorative slumber.",
        image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80"
    }
];

// Default initial reservations
const DEFAULT_RESERVATIONS = [
    {
        id: "res_asg_1001",
        userId: "usr_guest_01",
        customerName: "Thor Odinson",
        customerPhone: "+99 800-MJOLNIR",
        roomId: "room_101",
        roomNumber: "101",
        roomName: "Valhalla Royal Penthouse",
        roomType: "Royal Suite",
        checkIn: "2026-10-10",
        checkOut: "2026-10-14",
        nights: 4,
        guests: 2,
        pricePerNight: 350,
        totalPrice: 1400,
        specialRequests: "Stock mead flask and keep the thunder storm window open.",
        gatekeeperNotes: "Granted golden crest access by Heimdall.",
        status: "Confirmed",
        createdAt: "2026-10-01 10:00:00"
    }
];

// Default Notepad Entries (Local Notepad Ledger)
const DEFAULT_NOTES = [
    {
        id: "note_1",
        userId: "usr_guest_01",
        author: "Thor Odinson",
        title: "Bifrost Arrival Instructions",
        content: "Heimdall has scheduled the Bifrost opening for the 10th of October at twilight. Ensure Hofund key is placed at the eastern altar of Room 101.",
        date: "2026-10-01 10:05",
        category: "Gatekeeper Log"
    },
    {
        id: "note_2",
        userId: "usr_admin_01",
        author: "Heimdall",
        title: "Master Gatekeeper Protocol",
        content: "All nine realms guests must show clear intent upon booking. Keep Valhalla Suite fortified for royal banquets. Inspect Bifrost energy converters daily.",
        date: "2026-10-02 08:30",
        category: "Owner Master Audit"
    }
];

// Initialize Database Storage
function initDatabase() {
    if (!localStorage.getItem("asgard_users")) {
        localStorage.setItem("asgard_users", JSON.stringify(DEFAULT_USERS));
    }
    if (!localStorage.getItem("asgard_rooms")) {
        localStorage.setItem("asgard_rooms", JSON.stringify(DEFAULT_ROOMS));
    }
    if (!localStorage.getItem("asgard_reservations")) {
        localStorage.setItem("asgard_reservations", JSON.stringify(DEFAULT_RESERVATIONS));
        const rooms = JSON.parse(localStorage.getItem("asgard_rooms"));
        const rIndex = rooms.findIndex(r => r.id === "room_101");
        if (rIndex !== -1) {
            rooms[rIndex].status = "Occupied";
            localStorage.setItem("asgard_rooms", JSON.stringify(rooms));
        }
    }
    if (!localStorage.getItem("asgard_notes")) {
        localStorage.setItem("asgard_notes", JSON.stringify(DEFAULT_NOTES));
    }
}
initDatabase();

// ============================================================================
// CENTRAL CRUD DATABASE ENGINE (DB)
// ============================================================================
const DB = {
    getUsers: () => JSON.parse(localStorage.getItem("asgard_users") || "[]"),
    getUserById: (id) => DB.getUsers().find(u => u.id === id),

    registerUser: (username, password, name, realm, phone) => {
        const users = DB.getUsers();
        if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
            return { success: false, message: "A warrior with this realm username already exists!" };
        }
        const newUser = {
            id: "usr_" + Date.now(),
            username: username.trim(),
            password: password,
            role: "customer",
            name: name.trim() || username.trim(),
            realm: realm.trim() || "Midgard",
            avatar: "🛡️",
            phone: phone.trim() || "N/A"
        };
        users.push(newUser);
        localStorage.setItem("asgard_users", JSON.stringify(users));
        return { success: true, user: newUser };
    },

    getRooms: () => JSON.parse(localStorage.getItem("asgard_rooms") || "[]"),
    getRoomById: (roomId) => DB.getRooms().find(r => r.id === roomId),

    createRoom: (roomData) => {
        const rooms = DB.getRooms();
        if (rooms.find(r => r.number === roomData.number)) {
            return { success: false, message: `Chamber Room #${roomData.number} already exists in the citadel!` };
        }
        const newRoom = {
            id: "room_" + Date.now(),
            number: roomData.number,
            name: roomData.name,
            type: roomData.type || "Deluxe Suite",
            price: parseFloat(roomData.price),
            capacity: parseInt(roomData.capacity) || 2,
            status: "Available",
            amenities: roomData.amenities || ["Bifrost View", "Enchanted Hearth"],
            desc: roomData.desc || "A sacred hall within Hotel Asgard.",
            image: roomData.image || "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
        };
        rooms.push(newRoom);
        localStorage.setItem("asgard_rooms", JSON.stringify(rooms));

        DB.addNote({
            userId: "usr_admin_01",
            author: "Heimdall",
            title: `New Chamber Added: Room #${newRoom.number}`,
            content: `Heimdall has inaugurated Chamber #${newRoom.number} (${newRoom.name}) priced at ${newRoom.price} Gold Coins/night. Capacity: ${newRoom.capacity} deities.`,
            category: "Inventory Update"
        });

        return { success: true, room: newRoom };
    },

    updateRoom: (roomId, updateFields) => {
        const rooms = DB.getRooms();
        const index = rooms.findIndex(r => r.id === roomId);
        if (index === -1) return { success: false, message: "Room not found." };

        rooms[index] = { ...rooms[index], ...updateFields };
        localStorage.setItem("asgard_rooms", JSON.stringify(rooms));

        DB.addNote({
            userId: "usr_admin_01",
            author: "Heimdall",
            title: `Chamber Updated: Room #${rooms[index].number}`,
            content: `Room #${rooms[index].number} rate set to ${rooms[index].price} Gold Coins/night. Status: ${rooms[index].status}.`,
            category: "Inventory Update"
        });

        return { success: true, room: rooms[index] };
    },

    updateRoomStatus: (roomId, status) => {
        const rooms = DB.getRooms();
        const index = rooms.findIndex(r => r.id === roomId);
        if (index !== -1) {
            rooms[index].status = status;
            localStorage.setItem("asgard_rooms", JSON.stringify(rooms));
            return true;
        }
        return false;
    },

    deleteRoom: (roomId) => {
        let rooms = DB.getRooms();
        const room = rooms.find(r => r.id === roomId);
        if (!room) return { success: false, message: "Room not found." };

        const activeRes = DB.getReservations().find(res => res.roomId === roomId && res.status === "Confirmed");
        if (activeRes) {
            return { success: false, message: `Cannot delete Chamber #${room.number}! Active reservation #${activeRes.id} currently occupies it.` };
        }

        rooms = rooms.filter(r => r.id !== roomId);
        localStorage.setItem("asgard_rooms", JSON.stringify(rooms));

        DB.addNote({
            userId: "usr_admin_01",
            author: "Heimdall",
            title: `Chamber Decommissioned: #${room.number}`,
            content: `Heimdall has sealed Chamber #${room.number} (${room.name}) from the royal Asgard ledger.`,
            category: "Chamber Decommission"
        });

        return { success: true };
    },

    getReservations: () => JSON.parse(localStorage.getItem("asgard_reservations") || "[]"),
    getReservationById: (resId) => DB.getReservations().find(r => r.id === resId),
    getUserReservations: (userId) => DB.getReservations().filter(r => r.userId === userId),

    createReservation: (bookingData) => {
        const { userId, roomId, checkIn, checkOut, guests, specialRequests } = bookingData;
        const rooms = DB.getRooms();
        const users = DB.getUsers();

        const room = rooms.find(r => r.id === roomId);
        const user = users.find(u => u.id === userId);

        if (!room) return { success: false, message: "Selected chamber does not exist." };
        if (room.status !== "Available") {
            return { success: false, message: `Chamber #${room.number} is currently ${room.status}. Heimdall advises choosing another royal chamber.` };
        }

        const date1 = new Date(checkIn);
        const date2 = new Date(checkOut);
        const diffTime = date2 - date1;
        const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (nights <= 0) {
            return { success: false, message: "Departure date must follow after arrival date across the Bifrost." };
        }

        const totalPrice = room.price * nights;
        const now = new Date().toISOString().replace("T", " ").substring(0, 19);

        const newReservation = {
            id: "res_asg_" + Math.floor(1000 + Math.random() * 9000),
            userId: user ? user.id : userId,
            customerName: user ? user.name : "Honored Guest",
            customerPhone: user ? user.phone : "N/A",
            roomId: room.id,
            roomNumber: room.number,
            roomName: room.name,
            roomType: room.type,
            checkIn: checkIn,
            checkOut: checkOut,
            nights: nights,
            guests: parseInt(guests) || 1,
            pricePerNight: room.price,
            totalPrice: totalPrice,
            specialRequests: specialRequests || "None specified",
            gatekeeperNotes: "Sanctioned and sealed by Heimdall at the Bifrost Gates.",
            status: "Confirmed",
            createdAt: now
        };

        const reservations = DB.getReservations();
        reservations.unshift(newReservation);
        localStorage.setItem("asgard_reservations", JSON.stringify(reservations));

        DB.updateRoomStatus(room.id, "Occupied");

        DB.addNote({
            userId: newReservation.userId,
            author: "Heimdall, Bifrost Gatekeeper",
            title: `Booking Confirmation: Voucher #${newReservation.id}`,
            content: `================ HOTEL ASGARD VOUCHER ================\n` +
                     `RESERVATION ID: ${newReservation.id}\n` +
                     `GUEST NAME:     ${newReservation.customerName}\n` +
                     `CHAMBER:        Room #${newReservation.roomNumber} - ${newReservation.roomName}\n` +
                     `ARRIVAL:        ${newReservation.checkIn}\n` +
                     `DEPARTURE:      ${newReservation.checkOut} (${newReservation.nights} Nights)\n` +
                     `GUESTS:         ${newReservation.guests} Deity / Immortal\n` +
                     `RATE:           ${newReservation.pricePerNight} Gold / Night\n` +
                     `TOTAL COINS:    ${newReservation.totalPrice} Asgardian Gold\n` +
                     `REQUESTS:       ${newReservation.specialRequests}\n` +
                     `GATEKEEPER SIG: Sealed with Hofund by Heimdall\n` +
                     `======================================================`,
            category: "Reservation Receipt"
        });

        return { success: true, reservation: newReservation };
    },

    updateReservation: (resId, updateData) => {
        const reservations = DB.getReservations();
        const index = reservations.findIndex(r => r.id === resId);
        if (index === -1) return { success: false, message: "Reservation record not found." };

        const res = reservations[index];

        if (updateData.checkIn && updateData.checkOut) {
            const date1 = new Date(updateData.checkIn);
            const date2 = new Date(updateData.checkOut);
            const diffTime = date2 - date1;
            const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (nights <= 0) {
                return { success: false, message: "Departure date must follow arrival date." };
            }
            res.checkIn = updateData.checkIn;
            res.checkOut = updateData.checkOut;
            res.nights = nights;
            res.totalPrice = res.pricePerNight * nights;
        }

        if (updateData.guests) res.guests = parseInt(updateData.guests);
        if (updateData.specialRequests !== undefined) res.specialRequests = updateData.specialRequests;
        if (updateData.status) res.status = updateData.status;

        reservations[index] = res;
        localStorage.setItem("asgard_reservations", JSON.stringify(reservations));

        DB.addNote({
            userId: res.userId,
            author: "Heimdall, Gatekeeper",
            title: `Reservation Updated: #${res.id}`,
            content: `Reservation #${res.id} for Room #${res.roomNumber} has been modified.\nNew Dates: ${res.checkIn} to ${res.checkOut} (${res.nights} nights).\nGuests: ${res.guests}.\nUpdated Total: ${res.totalPrice} Gold Coins.`,
            category: "Booking Modification"
        });

        return { success: true, reservation: res };
    },

    deleteReservation: (resId, reason = "Cancelled by user") => {
        let reservations = DB.getReservations();
        const res = reservations.find(r => r.id === resId);
        if (!res) return { success: false, message: "Reservation not found." };

        DB.updateRoomStatus(res.roomId, "Available");

        reservations = reservations.filter(r => r.id !== resId);
        localStorage.setItem("asgard_reservations", JSON.stringify(reservations));

        DB.addNote({
            userId: res.userId,
            author: "Heimdall, Gatekeeper",
            title: `Reservation Cancelled: #${res.id}`,
            content: `Reservation #${res.id} for Chamber #${res.roomNumber} (${res.roomName}) was cancelled.\nReason: ${reason}.\nThe chamber has been returned to the available Bifrost inventory.\nTotal Refundable Credit: ${res.totalPrice} Gold Coins.`,
            category: "Cancellation Log"
        });

        return { success: true, message: `Reservation #${resId} cancelled and chamber freed.` };
    },

    getNotes: (userId = null) => {
        const notes = JSON.parse(localStorage.getItem("asgard_notes") || "[]");
        if (userId) {
            return notes.filter(n => n.userId === userId);
        }
        return notes;
    },

    getNoteById: (noteId) => DB.getNotes().find(n => n.id === noteId),

    addNote: (noteData) => {
        const notes = JSON.parse(localStorage.getItem("asgard_notes") || "[]");
        const now = new Date();
        const dateStr = now.toISOString().replace("T", " ").substring(0, 16);

        const newNote = {
            id: "note_" + Date.now() + "_" + Math.floor(Math.random() * 100),
            userId: noteData.userId || "usr_guest_01",
            author: noteData.author || "Guest",
            title: noteData.title || "Untitled Notepad Entry",
            content: noteData.content || "",
            date: noteData.date || dateStr,
            category: noteData.category || "General Note"
        };

        notes.unshift(newNote);
        localStorage.setItem("asgard_notes", JSON.stringify(notes));
        return { success: true, note: newNote };
    },

    updateNote: (noteId, title, content, category) => {
        const notes = JSON.parse(localStorage.getItem("asgard_notes") || "[]");
        const index = notes.findIndex(n => n.id === noteId);
        if (index === -1) return { success: false, message: "Note not found." };

        notes[index].title = title;
        notes[index].content = content;
        if (category) notes[index].category = category;
        notes[index].date = new Date().toISOString().replace("T", " ").substring(0, 16) + " (Edited)";

        localStorage.setItem("asgard_notes", JSON.stringify(notes));
        return { success: true, note: notes[index] };
    },

    deleteNote: (noteId) => {
        let notes = JSON.parse(localStorage.getItem("asgard_notes") || "[]");
        notes = notes.filter(n => n.id !== noteId);
        localStorage.setItem("asgard_notes", JSON.stringify(notes));
        return { success: true };
    },

    downloadAsNotepadTxt: (filename, textContent) => {
        if (typeof document === "undefined") return;
        const element = document.createElement("a");
        const file = new Blob([textContent], { type: "text/plain;charset=utf-8" });
        element.href = URL.createObjectURL(file);
        element.download = filename.endsWith(".txt") ? filename : filename + ".txt";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        URL.revokeObjectURL(element.href);
    },

    generateUserNotepadReport: (user) => {
        const reservations = DB.getUserReservations(user.id);
        const notes = DB.getNotes(user.id);
        const date = new Date().toLocaleString();

        let report = `=========================================================================\n`;
        report += `                     HOTEL ASGARD - REALM GUEST NOTEPAD                 \n`;
        report += `             "Guarded by Heimdall, Watchman of the Gods"                \n`;
        report += `=========================================================================\n\n`;
        report += `GUEST ACCOUNT:    ${user.name} (@${user.username})\n`;
        report += `ORIGIN REALM:     ${user.realm}\n`;
        report += `COMMUNICATION:    ${user.phone}\n`;
        report += `EXPORT TIMESTAMP: ${date}\n\n`;
        report += `-------------------------------------------------------------------------\n`;
        report += `                      CONFIRMED ROOM RESERVATIONS (${reservations.length})\n`;
        report += `-------------------------------------------------------------------------\n\n`;

        if (reservations.length === 0) {
            report += `No active room reservations currently booked.\n\n`;
        } else {
            reservations.forEach((r, idx) => {
                report += `[RESERVATION #${idx + 1}]\n`;
                report += `Reservation ID:  ${r.id}\n`;
                report += `Chamber Room:    Room #${r.roomNumber} - ${r.roomName} (${r.roomType})\n`;
                report += `Arrival Date:    ${r.checkIn}\n`;
                report += `Departure Date:  ${r.checkOut} (${r.nights} Nights)\n`;
                report += `Guests:          ${r.guests} Immortal(s)\n`;
                report += `Rate Per Night:  ${r.pricePerNight} Gold Coins\n`;
                report += `Total Billed:    ${r.totalPrice} Gold Coins\n`;
                report += `Booking Status:  ${r.status}\n`;
                report += `Special Request: ${r.specialRequests}\n`;
                report += `Gatekeeper Log:  ${r.gatekeeperNotes}\n\n`;
            });
        }

        report += `-------------------------------------------------------------------------\n`;
        report += `                    PERSONAL NOTEPAD LOGS & RECEIPTS (${notes.length})\n`;
        report += `-------------------------------------------------------------------------\n\n`;

        if (notes.length === 0) {
            report += `No personal notes logged in this account.\n\n`;
        } else {
            notes.forEach((n, idx) => {
                report += `[NOTE #${idx + 1}] ${n.title} (${n.category}) - ${n.date}\n`;
                report += `Author: ${n.author}\n`;
                report += `Content:\n${n.content}\n`;
                report += `-------------------------------------------------------------------------\n\n`;
            });
        }

        report += `=========================================================================\n`;
        report += `                  END OF HOTEL ASGARD GUEST NOTEPAD                      \n`;
        report += `=========================================================================\n`;

        return report;
    },

    generateMasterDatabaseNotepadReport: () => {
        const users = DB.getUsers();
        const rooms = DB.getRooms();
        const reservations = DB.getReservations();
        const notes = DB.getNotes();
        const date = new Date().toLocaleString();

        let totalRev = reservations.reduce((acc, r) => acc + (r.totalPrice || 0), 0);

        let report = `=========================================================================\n`;
        report += `               HOTEL ASGARD - MASTER DATABASE AUDIT NOTEPAD              \n`;
        report += `            OFFICIAL EXECUTIVE LEDGER OF HEIMDALL & THE ALLFATHER         \n`;
        report += `=========================================================================\n\n`;
        report += `REPORT GENERATED: ${date}\n`;
        report += `CITADEL REALM:    Hotel Asgard Central Watchtower\n`;
        report += `TOTAL REVENUE:    ${totalRev} Asgardian Gold Coins\n`;
        report += `TOTAL CHAMBERS:   ${rooms.length} | OCCUPIED: ${rooms.filter(r => r.status === 'Occupied').length}\n`;
        report += `TOTAL BOOKINGS:   ${reservations.length}\n`;
        report += `REGISTERED USERS: ${users.length}\n\n`;

        report += `=========================================================================\n`;
        report += `1. ROOM INVENTORY & RATE MATRIX (CRUD REPOSITORIES)\n`;
        report += `=========================================================================\n`;
        rooms.forEach(r => {
            report += `• [ROOM ${r.number}] ${r.name.padEnd(35)} | Type: ${r.type.padEnd(18)} | Price: ${r.price} Gold/night | Status: ${r.status}\n`;
        });
        report += `\n`;

        report += `=========================================================================\n`;
        report += `2. MASTER RESERVATION REGISTRY (ALL USERS)\n`;
        report += `=========================================================================\n`;
        reservations.forEach(r => {
            report += `ID: ${r.id} | Guest: ${r.customerName} (@${r.userId}) | Room: #${r.roomNumber}\n`;
            report += `Dates: ${r.checkIn} -> ${r.checkOut} (${r.nights}n) | Guests: ${r.guests} | Total: ${r.totalPrice} Gold | Status: ${r.status}\n`;
            report += `Notes: ${r.specialRequests}\n`;
            report += `-------------------------------------------------------------------------\n`;
        });
        report += `\n`;

        report += `=========================================================================\n`;
        report += `3. NOTEPAD AUDIT LOGS & GATEKEEPER SCROLLS (${notes.length} Total)\n`;
        report += `=========================================================================\n`;
        notes.forEach(n => {
            report += `[${n.date}] [${n.category}] ${n.title} (by ${n.author})\n`;
            report += `${n.content}\n\n`;
        });

        report += `=========================================================================\n`;
        report += `             END OF MASTER DATABASE AUDIT LEDGER NOTEPAD                 \n`;
        report += `=========================================================================\n`;

        return report;
    }
};

// ============================================================================
// AUTHENTICATION CONTROLLER (Auth)
// ============================================================================
const Auth = {
    login: (username, password) => {
        const users = DB.getUsers();
        const user = users.find(u => u.username.toLowerCase() === username.toLowerCase().trim() && u.password === password);
        if (user) {
            sessionStorage.setItem("asgard_current_user", JSON.stringify(user));
            return { success: true, user: user };
        }
        return { success: false, message: "Invalid credentials! Heimdall denies entrance to the Bifrost." };
    },

    getCurrentUser: () => {
        const stored = sessionStorage.getItem("asgard_current_user");
        if (!stored) return null;
        try {
            return JSON.parse(stored);
        } catch (e) {
            return null;
        }
    },

    logout: () => {
        sessionStorage.removeItem("asgard_current_user");
        window.location.href = "login.html";
    },

    protectRoute: (requiredRole = null) => {
        const user = Auth.getCurrentUser();
        if (!user) {
            window.location.href = "login.html";
            return null;
        }
        if (requiredRole && user.role !== requiredRole) {
            alert(`Access restricted! Your role (${user.role}) cannot access this sanctuary.`);
            window.location.href = user.role === "owner" ? "owner.html" : "index.html";
            return null;
        }
        return user;
    }
};

// Global & CommonJS Export Compatibility
if (typeof window !== "undefined") {
    window.DB = DB;
    window.Auth = Auth;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports = { DB, Auth };
}
