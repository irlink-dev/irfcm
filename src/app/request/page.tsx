'use client';

export default function RequestPage() {

    const onClick = () => {
        const url = 'https://fcm.googleapis.com/fcm/send';
        const promise = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'key=AAAA3oL10MI:APA91bEkdcwiOspk8hE8wog0yPHD-R4EABywrygMMjJ6Ul0F9pqQZVG7ZAl7U8l4H8oHpft-SyFf-DFuaU-BOSTzRoUXXLftI7aGy_HKQdD0TIFj7TuPi8-vgwpXXemVPb2_0IkT9Xxm'  // LINA_KEY
            },
            body: JSON.stringify({
                'to': 'c-r_h0-jT8C1wnEeJEbVu-:APA91bFVP0S54pTvolWyA9quGHVQNpG7KjC_1C2F7V5Ax2gi3ZysQSedLl9z9GipW66niC5Dx_hnMeLbRZjN-gQdsRjg-W7EmxUcPZHtCRQUph4DRm0TnSJmM0bCaPgJFKAofEzx4pBE',
                'data': {
                    'type': 1,
                    'date': '2023-03-22',
                    'isIncludeRecord': false
                },
                'priority': 'high'
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    };

    return (
        <>
            <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                    onClick={onClick}>FCM 요청</button>
        </>
    );
}
