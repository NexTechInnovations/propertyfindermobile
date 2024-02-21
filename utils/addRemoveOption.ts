export const handleAddRemoveOption = (
  option: any,
  setter: (arg1: any) => void,
  activeList: any[]
) => {
  return new Promise((resolve, rej) => {
    if (activeList.includes(option)) {
      const filteredActiveOptions = activeList.filter(
        (room) => room !== option
      );
      setter(filteredActiveOptions);
      resolve(filteredActiveOptions);
    } else {
      setter((prev: any) => [...prev, option]);
      resolve([...activeList, option]);
    }
  });
};
