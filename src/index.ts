import fetch from 'node-fetch';

// https://github.com/DjDeveloperr/ActivitiesBot/blob/main/mod.ts


const ACTIVITIES: {
    [name in ActivityNames]: {
      id: string;
      name: string;
    };
  } = {
    poker: {
      id: "755827207812677713",
      name: "Poker Night",
    },
    betrayal: {
      id: "773336526917861400",
      name: "Betrayal.io",
    },
    youtube: {
      id: "755600276941176913",
      name: "YouTube Together",
    },
    fishing: {
      id: "814288819477020702",
      name: "Fishington.io",
    },
    chess: {
      id: "832012586023256104",
      name: "Chess",
    },
};

type ActivityNames = "poker" | "betrayal" | "youtube" | "fishing" | "chess";

export async function Activities(activity: ActivityNames, CHANNEL_ID: number, BOT_TOKEN: string) {
    let invite = await fetch(`https://discord.com/api/v9/channels/${CHANNEL_ID}/invites`, {
        method: 'POST',
        headers: {
            'Authorization': `Bot ${BOT_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            max_age: 604800,
            max_uses: 0,
            target_application_id: ACTIVITIES[activity].id,
            target_type: 2,
            temporary: false,
        })
    });

    let invite_json = await invite.json();

    return (invite_json as any).code;
}