from database.database import get_all_users

def images_pageination(starting, size):
    all_users = get_all_users()
    allimages = []
    for imageArr in all_users:
        for image in imageArr['images']:
            allimages.append(image)
    return allimages[starting:starting+size]