    const savePage = async (title, url, date, time) => {
        const pages = await getPages();
        // @ts-ignore
        const updatedPages = [...pages, { title, url, date, time }];

        const promise = toPromise((resolve, reject) => {
            
            chrome.storage.local.set({ [PAGES_KEY]: updatedPages }, () => {          
                if (chrome.runtime.lastError)
                    reject(chrome.runtime.lastError);
                resolve(updatedPages);
            });
        });

        return promise;
    }

:xport { getPages, savePage };
