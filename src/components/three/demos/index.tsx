import { lazy } from "react";

// Lazy load demo components for better performance
export const NuweRustDemo = lazy(() =>
  import("./NuweRustDemo").then((module) => ({ default: module.NuweRustDemo })),
);

export const PlayDemo = lazy(() =>
  import("./PlayDemo").then((module) => ({ default: module.PlayDemo })),
);

export const PodiumJSDemo = lazy(() =>
  import("./PodiumJSDemo").then((module) => ({ default: module.PodiumJSDemo })),
);

export const WGSLXDemo = lazy(() =>
  import("./WGSLXDemo").then((module) => ({ default: module.WGSLXDemo })),
);

export const PCHILifeDemo = lazy(() =>
  import("./PCHILifeDemo").then((module) => ({ default: module.PCHILifeDemo })),
);

export const PodiumRocksDemo = lazy(() =>
  import("./PodiumRocksDemo").then((module) => ({
    default: module.PodiumRocksDemo,
  })),
);

export const GeyserDemo = lazy(() =>
  import("./GeyserDemo").then((module) => ({ default: module.GeyserDemo })),
);

export const ShadersHubDemo = lazy(() =>
  import("./ShadersHubDemo").then((module) => ({
    default: module.ShadersHubDemo,
  })),
);

export const VJsAgencyDemo = lazy(() =>
  import("./VJsAgencyDemo").then((module) => ({
    default: module.VJsAgencyDemo,
  })),
);

export const VSCodeISFDemo = lazy(() =>
  import("./VSCodeISFDemo").then((module) => ({
    default: module.VSCodeISFDemo,
  })),
);

export const NuweStrippedDemo = lazy(() =>
  import("./NuweStrippedDemo").then((module) => ({
    default: module.NuweStrippedDemo,
  })),
);

export const ModurustVSTHexoDSPDemo = lazy(() =>
  import("./ModurustVSTHexoDSPDemo").then((module) => ({
    default: module.ModurustVSTHexoDSPDemo,
  })),
);

export const PDRSSynthDemo = lazy(() =>
  import("./PDRSSynthDemo").then((module) => ({
    default: module.PDRSSynthDemo,
  })),
);

export const RustFractalShaderEngineDemo = lazy(() =>
  import("./RustFractalShaderEngineDemo").then((module) => ({
    default: module.RustFractalShaderEngineDemo,
  })),
);

export const StreamDiffusionRSDemo = lazy(() =>
  import("./StreamDiffusionRSDemo").then((module) => ({
    default: module.StreamDiffusionRSDemo,
  })),
);

export const NFTBlockchainInteractiveDemo = lazy(() =>
  import("./NFTBlockchainInteractiveDemo").then((module) => ({
    default: module.NFTBlockchainInteractiveDemo,
  })),
);

// Demo component mapper for easy lookup by project ID
export const getDemoComponent = (projectId: string) => {
  const demoMap: Record<string, React.LazyExoticComponent<React.FC>> = {
    "nuwe-rust": NuweRustDemo,
    "pchi-life": PCHILifeDemo,
    podiumjs: PodiumJSDemo,
    "podium-rocks": PodiumRocksDemo,
    geyser: GeyserDemo,
    shadershub: ShadersHubDemo,
    "vjs-agency": VJsAgencyDemo,
    "vscode-isf": VSCodeISFDemo,
    wgslx: WGSLXDemo,
    play: PlayDemo,
    "nuwe-stripped": NuweStrippedDemo,
    "modurust-vst-hexodsp": ModurustVSTHexoDSPDemo,
    "pd-rs-synth": PDRSSynthDemo,
    "rust-fractal-shader-engine": RustFractalShaderEngineDemo,
    "stream-diffusion-rs": StreamDiffusionRSDemo,
    "nft-blockchain-interactive": NFTBlockchainInteractiveDemo,
  };

  return demoMap[projectId] || null;
};
