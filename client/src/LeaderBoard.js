import React, { useEffect, useState } from 'react';
import { socket } from './App';

const LeaderBoard = () => {
    const [room, setRoom] = useState();

    useEffect(() => {
        socket.on("update leaderboard", (room) => {
            setRoom(room);
        });

        return () => socket.off("update leaderboard");
    }, []);

    return (
        <div className='md:w-1/2 container mx-auto h-96 flex flex-col'>
            <div className="heading primary">
                <span>LeaderBoard</span>
                {room && <span>{(room.players.findIndex(play => play.id === socket.id) + 1)}/{room.players.length}</span>}
            </div>

            <div className='flex flex-col overflow-y-auto p-4 gap-2'>
                {room ? (room.players.sort((a, b) => b.score - a.score).map((player, index) =>
                    <div key={player.id} className={`${player.id !== socket.id ? "primary" : "secondary"} text-xl font-bold  px-4 py-2 rounded-xl flex justify-between`}>
                        <span>{index + 1}. {player.name}{room.players[room.turnIndex - 1]?.id === player.id ? " (Drawing)" : ""}</span>
                        <span>{player.score}</span>
                    </div>)
                ) : <div className="rounded-full border-4 border-transparent border-b-yellow-500 w-8 aspect-square animate-spin m-auto"></div>}
            </div>
        </div>
    )
}

export default LeaderBoard;