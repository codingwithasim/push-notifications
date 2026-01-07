
self.addEventListener("push", event => {
    let data = {title: "Default title", body: "Default body message"}

    
    if(event.data){
        try{
            data = event.data.json()
        }catch(err){
            console.error(err)
        }
    }

    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            tag: "Message Service"
        })
    )
})