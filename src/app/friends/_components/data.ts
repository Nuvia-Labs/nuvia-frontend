import type { Friend } from "./types";

export const mockFriends: Friend[] = [
  {
    id: 1,
    name: "Alex Chen",
    username: "@alexchen",
    avatar: "/Images/Logo/nuvia-logo.png",
    vault: "Moonwell",
    amount: "0.025",
    apy: "8.5%",
    status: "farming",
  },
  {
    id: 2,
    name: "Sarah Kim",
    username: "@sarahk",
    avatar: "/Images/Logo/nuvia-logo.png",
    vault: "Aave",
    amount: "1.2",
    apy: "6.7%",
    status: "farming",
  },
  {
    id: 3,
    name: "Mike Johnson",
    username: "@mikej",
    avatar: "/Images/Logo/nuvia-logo.png",
    vault: "Aerodrome",
    amount: "5,250",
    apy: "5.3%",
    status: "farming",
  },
  {
    id: 4,
    name: "Emma Davis",
    username: "@emmad",
    avatar: "/Images/Logo/nuvia-logo.png",
    vault: "Moonwell",
    amount: "0.15",
    apy: "8.5%",
    status: "farming",
  },
];

export const getVaultLogo = (vault: string) => {
  switch (vault) {
    case "Moonwell":
      return "/Images/Logo/moonwell-logo.png";
    case "Aave":
      return "/Images/Logo/aave-logo.png";
    case "Aerodrome":
      return "/Images/Logo/aerodrome-logo.svg";
    case "Morpho":
      return "/Images/Logo/morpho-logo.jpeg";
    case "EtherFi":
      return "/Images/Logo/etherfi-logo.png";
    case "Ethena":
      return "/Images/Logo/ethena-logo.png";
    default:
      return "/Images/Logo/nuvia-logo.png";
  }
};
