export interface CRUDService {
    create(dto);
    get(id: number | string);
    update(id: number | string, dto);
    delete(id: number | string);
}