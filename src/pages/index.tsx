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
  const playerIdList = [
    3547249, 38017620, 4, 17896097, 3, 22, 17895854, 38017704, 3547239, 30,
    17896094, 38017683, 3547251, 15, 19, 17896067, 28, 3547095, 24,
  ];
  const index1 = getRandomInt(0, 15);
  let index2 = getRandomInt(0, 15);
  if (index1 == index2) {
    index2 = ++index2;
  }
  const player_id1 = playerIdList[index1];
  const player_id2 = playerIdList[index2];
  return [player_id1, player_id2];
}
function getRandomPlayer(id1: number, id2: number) {
  let index = getRandomInt(0, 2);
  if ((index = 0)) {
    return id1;
  } else {
    return id2;
  }
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
  await sleep(1000);
  window.location.reload();
}

//const player_id1: number = getRandomPlayers()!;
//const player_id2: number = getRandomPlayer2(player_id1)!;
const [player_id1, player_id2] = getRandomPlayers();
const chosenplayer_id: number = getRandomPlayer(player_id1!, player_id2!)!;

const Home: NextPage = () => {
  const playerData1 = trpc.player.getPlayer1.useQuery({
    playerId: player_id1!,
  });
  const playerData2 = trpc.player.getPlayer2.useQuery({
    playerId: player_id2!,
  });
  // const playerTest = trpc.example.getPlayer1.useQuery({ playerId: player_id1 });
  const statData = trpc.stats.getStats.useQuery({ playerId: chosenplayer_id });
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
            <div className="h-20 w-80 flex-auto rounded-lg bg-slate-200 shadow-lg hover:shadow-xl">
              <p className="pl-4 pt-2 font-mona  text-2xl text-slate-900">
                {playerData1.data
                  ? playerData1.data.first_name
                  : "Loading tRPC query..."}{" "}
                {playerData1.data
                  ? playerData1.data.last_name
                  : "Loading tRPC query..."}
              </p>
            </div>
          </button>
          <div className="h-20 w-80 flex-auto rounded-lg bg-slate-50">
            <p className="pt-6 text-center font-mona  text-2xl text-orange-600">
              {statData.data ? statData.data.pts : "Loading tRPC query..."} pts
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
            <div className="h-20 w-80 flex-auto rounded-lg bg-slate-200 shadow-lg hover:shadow-xl">
              <p className="pl-4 pt-2 font-mona text-2xl text-slate-900">
                {playerData2.data
                  ? playerData2.data.first_name
                  : "Loading tRPC query..."}{" "}
                {playerData2.data
                  ? playerData2.data.last_name
                  : "Loading tRPC query..."}
              </p>
            </div>
          </button>
        </div>
      </main>
    </>
  );
};

export default Home;
