return (
    <Container fluid className="p-0">
        <Navigation/>
        <div className="episode-watch-container">
            <MediaQuery orientation='landscape'>
            <ReactFullscreen>
            {({ onExit, onToggle }) => (
            <Ratio aspectRatio={40}>
                <>
                    <Artplayer
                        className="video-player-style"
                        option={{
                            url: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`,
                            aspectRatio: true,
                            hotkey: true,
                            whitelist: ['*'],
                            playbackRate: true,
                            localSubtitle: true,
                            theme: "var(--accent)",
                            layers: [
                                {
                                    html: "",
                                    name: "header"
                                },
                                {
                                    html: "",
                                    name: "controls"
                                }
                            ],
                            controls: [
                                {
                                    position: 'right',
                                    html: '<div class="art-control art-control-fullscreen ps-4" data-index="70"><i class="video-player-icon bi bi-arrows-fullscreen"></i></div>',
                                    tooltip: 'Fullscreen',
                                    click: function() {
                                        onToggle()
                                    }
                                },
                            ],
                            icons: {
                                state: '<i class="video-player-state-icon bi bi-play-fill"></i>',
                                play: '<i class="video-player-icon bi bi-play-fill"></i>',
                                pause: '<i class="video-player-icon bi bi-pause-fill"></i>',
                                volume: '<i class="video-player-icon bi bi-volume-down-fill"></i>',
                                volumeClose: '<i class="video-player-icon bi bi-volume-mute-fill"></i>',
                            },
                        }}
                        getInstance={(art) => {
                            art.on("ready", () => setArt(art));
                        }}
                    />
                    {art ? createPortal(<VideoHeader onExit={onExit} />, art.layers.header) : null}
                    </>
                </Ratio>
            )}
            </ReactFullscreen>
            </MediaQuery>
            <MediaQuery orientation='portrait'>
                <Ratio aspectRatio="16x9">
                    <Artplayer
                        className="video-player-style"
                        option={{
                            url: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`,
                            aspectRatio: true,
                            hotkey: true,
                            whitelist: ['*'],
                            playbackRate: true,
                            localSubtitle: true,
                            theme: "var(--accent)",
                            layers: [
                                {
                                    html: "",
                                    name: "header"
                                },
                                {
                                    html: "",
                                    name: "controls"
                                }
                            ],
                            controls: [
                                {
                                    position: 'right',
                                    html: '<div class="art-control art-control-fullscreen ps-4" data-index="70"><i class="video-player-icon bi bi-arrows-fullscreen"></i></div>',
                                    tooltip: 'Fullscreen',
                                },
                            ],
                            icons: {
                                state: '<i class="video-player-state-icon bi bi-play-fill"></i>',
                                play: '<i class="video-player-icon bi bi-play-fill"></i>',
                                pause: '<i class="video-player-icon bi bi-pause-fill"></i>',
                                volume: '<i class="video-player-icon bi bi-volume-down-fill"></i>',
                                volumeClose: '<i class="video-player-icon bi bi-volume-mute-fill"></i>',
                            },
                        }}
                    />
                </Ratio>
            </MediaQuery>
        </div>
    </Container>
);