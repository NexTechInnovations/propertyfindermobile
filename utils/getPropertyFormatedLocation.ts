export const getPropertyFormattedLocation = (location: { name: string }[]) => {
  return location.map((item: any) => item.name).join(", ");
};
