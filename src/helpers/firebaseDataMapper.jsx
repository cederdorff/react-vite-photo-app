export function mapFirebaseDocuments(docs) {
    return docs.documents.map(doc => mapFirebaseDocument(doc));
}

export function mapFirebaseDocument(doc) {
    const fields = doc.fields;
    const object = {};
    object.id = doc.name.split("/").pop();
    object.createTime = doc.createTime;
    object.updateTime = doc.updateTime;

    for (const field in fields) {
        object[field] = Object.values(fields[field])[0];
    }
    return object;
}
