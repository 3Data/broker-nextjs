import { RoomProvider } from '@/app/contexts/room';
import { Controls } from '@/components/Controls';
import { Video } from '@/components/Video';
import { Chat } from '@/components/chat';
import { getIframe, getPartnerToken, getRoom } from '@/shared/api';

export default async function Webcam(props) {
  // Await both params and searchParams
  const params = await props.params;
  const searchParams = await props.searchParams;

  const { data: partnerToken } = await getPartnerToken();
  const { data: room } = await getRoom({ nick: params.nick, partnerToken });

  // Get mode from query params, fallback to 'auto'
  const mode = searchParams?.mode || 'auto';
  const ondemandId = searchParams?.ondemandId;

  console.log('Mode:', mode);
  console.log('OnDemand ID:', ondemandId);

  const { data: iframe } = await getIframe({
    roomId: room.id,
    partnerToken,
    mode,
  });

  return (
    <main className="container mx-auto p-2 grow flex flex-col">
      <h1>Sala de: {room.nick}</h1>
      <div className="h-2 sm:h-8" />
      <RoomProvider
        sessionToken={iframe.sessionToken}
        defaultMode={room.roomMode}
        ondemandId={ondemandId}
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
