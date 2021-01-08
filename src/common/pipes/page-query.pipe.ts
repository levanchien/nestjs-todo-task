import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { PageQuery } from 'src/common/interfaces/page-object.interface';
import { PAGE_QUERY } from 'src/constants/constants';
import * as _ from "lodash";

@Injectable()
export class ParsePageQuery implements PipeTransform<any, PageQuery> {
  transform(query: any, metadata: ArgumentMetadata): PageQuery {
    return this.handlePageQuery(query);
  }

  private handlePageQuery(query) {
    const pageQuery: PageQuery = {} as PageQuery;
    if (!query || _.isEmpty(query)) {
      return null;
    }

    query.per_page = _.parseInt(query.per_page);
    query.page = _.parseInt(query.page);

    pageQuery.limit = query.per_page || PAGE_QUERY.DEFAULT_LIMIT;
    pageQuery.offset = query.page ?
      (query.page - 1) * pageQuery.limit : PAGE_QUERY.DEFAULT_OFFSET;
    pageQuery.query = query.q;

    pageQuery.order = [];
    const sort = query.sort;
    if (sort && sort.length) {
      if (typeof sort === 'string') {
        pageQuery.order.push(sort.split(':'));
      }

      if (Array.isArray(sort)) {
        sort.forEach(item => pageQuery.order.push(item.split(':')));
      }
    }

    return pageQuery;
  }
}

