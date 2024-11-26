export const OBJECT_VALUE = {
  player: 2,
  bot: 3,
  wall: 1,
  no_thing: 0,
  boom: 4,
  deadZone: 5,
  items: {
    box: 6
  }
};

export const GameObject = (type, gameObjs, x, y) => {
  let mapType = type;

  const obj = gameObjs && gameObjs.find((go) => go.x === x && go.y === y);

  if (obj && mapType !== OBJECT_VALUE.player) {
    mapType = obj.value;
  }

  switch (mapType) {
    case OBJECT_VALUE.player:
      return (
        <div style={{ width: 40, height: 40, background: "green" }}>
          {mapType}
        </div>
      );

    case OBJECT_VALUE.bot:
      return (
        <div style={{ width: 40, height: 40, background: "red" }}>
          {mapType}
        </div>
      );

    case OBJECT_VALUE.wall:
      return (
        <div style={{ width: 40, height: 40, background: "grey" }}>
          {mapType}
        </div>
      );

    case OBJECT_VALUE.no_thing:
      return (
        <div style={{ width: 40, height: 40, background: "white" }}>
          {mapType}
        </div>
      );

    case OBJECT_VALUE.boom:
      return (
        <div style={{ width: 40, height: 40, background: "black" }}>
          {mapType}
        </div>
      );
    case OBJECT_VALUE.deadZone:
      return (
        <div style={{ width: 40, height: 40, background: "orange" }}>
          {mapType}
        </div>
      );
    case OBJECT_VALUE.items.box:
      return (
        <div style={{ width: 40, height: 40, background: "yellow" }}>
          {mapType}
        </div>
      );
    default:
      return <>Error</>;
  }
};
