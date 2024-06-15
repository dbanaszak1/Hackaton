from google.cloud.firestore_v1 import DocumentReference


def serialize_document_reference(ref):

    if isinstance(ref, DocumentReference):
        ref_doc = ref.get()
        if ref_doc.exists:
            serialized_doc = serialize_document(ref_doc)
            serialized_doc['id'] = ref_doc.id  # Include the ID of the referenced document
            return serialized_doc
    return ref


def serialize_document(doc):
    doc_dict = doc.to_dict()
    for key, value in doc_dict.items():
        if isinstance(value, DocumentReference):
            doc_dict[key] = serialize_document_reference(value)
        elif isinstance(value, list):
            doc_dict[key] = [serialize_document_reference(item) if isinstance(item, DocumentReference) else item for
                             item in value]
    return doc_dict
