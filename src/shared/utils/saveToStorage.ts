export default function saveToStorage(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
}
