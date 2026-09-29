// แปลงวันที่เป็นรูปแบบไทย เช่น 14 กุมภาพันธ์ 2566
export const fmt = (d) =>
  new Date(d).toLocaleDateString("th-TH", { day: "numeric", month: "long", year: "numeric" });
