export const dummyData = [
  {
    id: 1,
    title: 'Card 1 (Admin Only)',
    content: 'This card is only visible to users with the "admin" role.',
    roles: ['admin'],
  },
  {
    id: 2,
    title: 'Card 2 (All Users)',
    content: 'This card is visible to all users.',
    roles: ['admin', 'viewer'],
  },
  {
    id: 3,
    title: 'Card 3 (Viewer Only)',
    content: 'This card is only visible to users with the "viewer" role.',
    roles: ['viewer'],
  },
];

export const chartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)',
      ],
      borderWidth: 1,
    },
  ],
};
