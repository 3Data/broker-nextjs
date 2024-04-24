import { RoomItem } from "@/components/RoomItem";
import { getPartnerToken, getRooms } from "@/shared/api";

export default async function Home() {
  const { data: partnerToken } = await getPartnerToken();
  const { data: roomlist, error } = await getRooms({ partnerToken });

  if (error) {
    return (
      <main className="container mx-auto p-2 grow">
        <p className="font-semibold">Error al obtener el listado de salas</p>
        <p className="text-red-500">
          {error.code}: {error.error}
        </p>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-2 grow">
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
