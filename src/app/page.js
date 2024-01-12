import { RoomItem } from "@/components/RoomItem";
import { getRooms } from "@/shared/api";

export default async function Home() {
  const { data: roomlist } = await getRooms();

  return (
    <main className="container mx-auto p-2">
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {roomlist.results.map((room) => (
          <li key={room.id}>
            <RoomItem room={room} />
          </li>
        ))}
      </ul>
    </main>
  );
}
