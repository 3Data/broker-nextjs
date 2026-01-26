import { RoomProvider } from "@/app/contexts/room";
import { Controls } from "@/components/Controls";
import { Video } from "@/components/Video";
import { Chat } from "@/components/chat";
import { getIframe, getPartnerToken, getRoom } from "@/shared/api";

export default async function Webcam(props) {
  const params = await props.params;
  const { data: partnerToken } = await getPartnerToken();
  const { data: room } = await getRoom({ nick: params.nick, partnerToken });
  const { data: iframe } = await getIframe({ roomId: room.id, partnerToken });

  return (
    <main className="container mx-auto p-2 grow flex flex-col">
      <h1>Sala de: {room.nick}</h1>
      <div className="h-2 sm:h-8" />
      <RoomProvider
        sessionToken={iframe.sessionToken}
        defaultMode={room.roomMode}
      >
        <div className="flex flex-col grow sm:grow-0 sm:grid sm:grid-cols-3 gap-1">
          <div className="sm:col-span-2">
            <Video src={iframe.urlVideo} />
            <Controls />
          </div>
          <div className="flex flex-col grow relative">
            <Chat urlChat={iframe.urlChat} sessionToken={iframe.sessionToken} />
          </div>
        </div>
      </RoomProvider>
    </main>
  );
}
