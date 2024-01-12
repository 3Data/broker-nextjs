import { RoomProvider } from "@/app/contexts/room";
import { Controls } from "@/components/Controls";
import { RoomMode } from "@/components/RoomMode";
import { Chat } from "@/components/chat";
import { getIframe, getPartnerToken, getRoom } from "@/shared/api";

export default async function Webcam({ params }) {
  const { data: partnerToken } = await getPartnerToken();
  const { data: room } = await getRoom({ nick: params.nick, partnerToken });
  const { data: iframe } = await getIframe({ roomId: room.id, partnerToken });

  return (
    <main className="container mx-auto p-2">
      <h1>Sala de: {room.nick}</h1>
      <div className="h-8" />
      <RoomProvider
        sessionToken={iframe.sessionToken}
        defaultMode={room.roomMode}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <div className="relative">
              <RoomMode className="absolute top-2 right-2" />
              <iframe
                name="video-frame"
                src={iframe.urlVideo}
                className="w-full rounded-lg bg-black aspect-video"
                allow="geolocation;microphone;camera;autoplay;fullscreen"
              />
            </div>
            <div className="h-2" />
            <Controls />
          </div>
          <div>
            <Chat sessionToken={iframe.sessionToken} />
            <iframe name="chat-frame" src={iframe.urlChat} className="hidden" />
          </div>
        </div>
      </RoomProvider>
    </main>
  );
}
