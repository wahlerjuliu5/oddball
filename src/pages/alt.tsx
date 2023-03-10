import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { GoodResults } from "../components/Goodresults";
import { BadResults } from "../components/Badresults";
import { trpc } from "../utils/trpc";
import React from "react";
import { number } from "zod";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  const index1 = Math.floor(Math.random() * (max - min) + min);
  return index1;
}

function getRandomPlayers() {
  const player_id1 = getRandomInt(0, 481);
  let player_id2 = getRandomInt(0, 481);
  if (player_id1 == player_id2) {
    player_id2 = ++player_id2;
  }
  return [player_id1, player_id2];
}

function getRandomPlayer(id1: number, id2: number) {
  const index = getRandomInt(0, 2);
  if (index == 0) {
    return id1;
  } else {
    return id2;
  }
}
function getRandomStat() {
  const statList = [
    "pts",
    "ast",
    "blk",
    "tov",
    "tpp",
    "fgp",
    "stl",
    "reb",
    "plusminus",
  ];
  const index = getRandomInt(0, 15);
  const stat = statList[index];

  return stat;
}

function handleClick(clickedplayer_id: number) {
  console.log(clickedplayer_id);
  console.log(chosenplayer_id);
  if (clickedplayer_id == chosenplayer_id) {
    console.log("y");
    return true;
  } else {
    console.log("n");
    return false;
  }
}
async function Refresh() {
  await sleep(2000);
  window.location.reload();
}

const [player_id1, player_id2] = getRandomPlayers();
const chosenplayer_id: number = getRandomPlayer(player_id1!, player_id2!)!;
const chosenstat = getRandomStat();

const Home: NextPage = () => {
  const firstplayer = trpc.playerDB.getPlayer.useQuery({
    playerId: player_id1!,
  });
  const secondplayer = trpc.playerDB.getPlayer.useQuery({
    playerId: player_id2!,
  });
  const chosenplayer = trpc.playerDB.getPlayer.useQuery({
    playerId: chosenplayer_id!,
  });
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(false);
  return (
    <>
      <Head>
        <title>oddBall</title>
        <meta name="description" content="Browser based Basketball Game" />
        <link rel="icon" href="/bbfavicon.ico" />
      </Head>
      <div className=" items-start bg-gradient-to-b from-orange-500 to-orange-600">
        <p className="pl-4 pt-2 font-mona  text-2xl text-slate-900">oddBall</p>
      </div>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-100 to-slate-50">
        <div className="space-y-4">
          {showResults && results && <GoodResults />}
          {showResults && !results && <BadResults />}
          <button
            onClick={() => {
              handleClick(player_id1!);
              setShowResults(true);
              setResults(handleClick(player_id1!));
              Refresh();
            }}
          >
            <div className="w-80 flex-auto rounded-lg bg-slate-200 shadow-lg hover:shadow-xl">
              <p className="pl-4 pt-2 font-mona  text-2xl text-slate-900">
                {firstplayer.data ? firstplayer.data.name : ""}
              </p>
              <p className="pt-1 font-mona  text-sm text-slate-800">
                {!showResults && firstplayer.data ? firstplayer.data.team : ""}
              </p>
              <br />
              <p className=" pb-2 font-mona text-sm text-slate-800">
                {showResults && firstplayer.data?.pts}
              </p>
            </div>
          </button>
          <div className="h-20 w-80 flex-auto rounded-lg bg-slate-50">
            <p className="pt-6 text-center font-mona  text-2xl text-orange-600">
              {chosenplayer.data ? chosenplayer.data.pts : ""} pts
            </p>
          </div>
          <button
            onClick={() => {
              handleClick(player_id2!);
              setShowResults(true);
              setResults(handleClick(player_id2!));
              Refresh();
            }}
          >
            <div className="w-80 flex-auto rounded-lg bg-slate-200 shadow-lg hover:shadow-xl">
              <p className="pl-4 pt-2 font-mona text-2xl text-slate-900">
                {secondplayer.data ? secondplayer.data.name : ""}{" "}
              </p>
              <p className="pt-1 font-mona  text-sm text-slate-800">
                {!showResults && secondplayer.data
                  ? secondplayer.data.team
                  : ""}
              </p>
              <br />
              <p className="pb-2 font-mona text-sm text-slate-800">
                {" "}
                {showResults && secondplayer.data?.pts}
              </p>
            </div>
          </button>
        </div>
      </main>
    </>
  );
};

export default Home;
