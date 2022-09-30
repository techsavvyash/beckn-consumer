import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { OnSearchDTO } from './dto/search.dto';
import { ACTIONS } from '../schemas/types/actions.enum';
import {
  PaymentStatus,
  PaymentTypes,
  PaymentURIMimeTypes,
} from 'src/schemas/types/payment.enum';
import { ScalarType } from 'src/schemas/types/scalar.enum';

@Injectable()
export class SearchService {
  constructor(private readonly httpService: HttpService) { }

  async searchPItem(query: string) {
    const data: OnSearchDTO = {
      context: {
        domain: {
          domain: 'DSEP',
        },
        country: { name: 'INDIA', code: 'IND' },
        city: { name: 'Delhi', code: 'DEL' },
        action: ACTIONS.search,
        core_version: '3.0',
        bap_id: '101',
        bap_uri: 'http://localhost:3333',
        transaction_id: '101',
        message_id: '101',
        timestamp: Date.now().toString(),
      },
      message: {
        catalog: {
          descriptor: {
            name: 'Descriptor',
            code: 'desc',
            symbol: 'SYM',
            short_desc: 'short description',
            long_desc: 'long description',
          },
          categories: [
            {
              id: '10001',
              parent_category_id: '1000',
              descriptor: {
                name: 'Descriptor',
                code: 'desc',
                symbol: 'SYM',
                short_desc: 'short description',
                long_desc: 'long description',
              },
            },
          ],
          fulfillment: [
            {
              id: 'F1001',
              type: 'fulfillment type',
              provider_id: '101',
              rating: 'superb',
              state: {
                descriptor: {
                  name: 'Descriptor',
                  code: 'desc',
                  symbol: 'SYM',
                  short_desc: 'short description',
                  long_desc: 'long description',
                },
                updated_at: Date.now().toString(),
                updated_by: 'Jane Doe',
              },
              tracking: false,
              customer: {
                person: {
                  name: { name: 'Person' },

                  dob: Date.now().toString(),
                  gender: 'M',
                  cred: 'super safe credentials',
                  tags: [{ tag: 'Tag1' }, { tag: 'Tag1' }, { tag: 'Tag1' }],
                },
                contact: {
                  phone: 'XXXXXXXXX',
                  email: 'e@mail.com',
                  tags: [{ tag: 'Tag1' }, { tag: 'Tag1' }],
                },
              },
              agent: {
                person: {
                  name: { name: 'Person' },

                  dob: Date.now().toString(),
                  gender: 'M',
                  cred: 'super safe credentials',
                  tags: [{ tag: 'Tag1' }, { tag: 'Tag1' }, { tag: 'Tag1' }],
                },
                contact: {
                  phone: 'XXXXXXXXX',
                  email: 'e@mail.com',
                  tags: [{ tag: 'Tag1' }, { tag: 'Tag1' }],
                },
                rateable: { rateable: true },
              },
            },
          ],
          payments: [
            {
              uri: 'http://payemnt.uri',
              uri_mime_type: PaymentURIMimeTypes.text_plain,
              params: {
                amount: 14521,
                currency: 'INR',
                transaction_id: '1547',
                bank_account_number: 'XXXXXXXXX',
                bank_code: 'XXXX',
                bank_id_type: 'bank id type',
                virtual_payment_address: 'XXXXX',
              },
              type: PaymentTypes.ON_ORDER,
              status: PaymentStatus.NOT_PAID,
              time: {
                label: Date.now().toString(),
                timestamp: Date.now(),
                duration: {
                  duration: '2 hours',
                },
                range: {
                  start: Date.now().toString(),
                  end: Date.now().toString(),
                },
                days: 'Monday',
                schedule: {
                  frequency: {
                    duration: '2 hours',
                  },
                  holidays: ['Tues', 'Wed'],
                  times: [
                    Date.now().toString(),
                    Date.now().toString(),
                    Date.now().toString(),
                  ],
                },
              },
            },
          ],
          offers: [
            {
              id: 'offer101',
              descriptor: {
                name: 'Descriptor',
                code: 'desc',
                symbol: 'SYM',
                short_desc: 'short description',
                long_desc: 'long description',
              },
              location_ids: [
                {
                  id: 'loc123',
                  descriptor: {
                    name: 'Descriptor',
                    code: 'desc',
                    symbol: 'SYM',
                    short_desc: 'short description',
                    long_desc: 'long description',
                  },
                  gps: {
                    gps: 'lat long',
                  },
                  address: {
                    address: { full: 'full address here!' },
                  },
                  station_code: 'DEL',
                  city: {
                    name: 'Delhi',
                    code: 'DEL',
                  },
                  country: {
                    name: 'INDIA',
                    code: 'IND',
                  },
                  circle: {
                    gps: {
                      gps: 'lat long',
                    },
                    radius: {
                      type: ScalarType.CONSTANT,
                      value: 8.45,
                      estimated_value: 8.45,
                      computed_value: 8.45,
                      range: {
                        min: 5,
                        max: 10,
                      },
                      unit: 'cm',
                    },
                  },
                },
                // time: {
                //   label: Date.now().toString(),
                //   timestamp: Date.now(),
                //   duration: {
                //     duration: '2 hours',
                //   },
                //   range: {
                //     start: Date.now().toString(),
                //     end: Date.now().toString(),
                //   },
                //   days: 'Monday',
                //   schedule: {
                //     frequency: {
                //       duration: '2 hours',
                //     },
                //     holidays: ['Tues', 'Wed'],
                //     times: [
                //       Date.now().toString(),
                //       Date.now().toString(),
                //       Date.now().toString(),
                //     ],
                //   },
                // },
              ],
            },
          ],
          providers: [
            {
              id: 'Provider1',
              descriptor: {
                name: 'Descriptor',
                code: 'desc',
                symbol: 'SYM',
                short_desc: 'short description',
                long_desc: 'long description',
              },
              category_id: '1001',
              rating: 'superb',
              time: Date.now().toString(),
              categories: [
                {
                  id: '10001',
                  parent_category_id: '1000',
                  descriptor: {
                    name: 'Descriptor',
                    code: 'desc',
                    symbol: 'SYM',
                    short_desc: 'short description',
                    long_desc: 'long description',
                  },
                },
              ],
              fulfillments: [
                {
                  id: 'F1001',
                  type: 'fulfillment type',
                  provider_id: '101',
                  rating: 'superb',
                  state: {
                    descriptor: {
                      name: 'Descriptor',
                      code: 'desc',
                      symbol: 'SYM',
                      short_desc: 'short description',
                      long_desc: 'long description',
                    },
                    updated_at: Date.now().toString(),
                    updated_by: 'Jane Doe',
                  },
                  tracking: false,
                  customer: {
                    person: {
                      name: { name: 'Person' },

                      dob: Date.now().toString(),
                      gender: 'M',
                      cred: 'super safe credentials',
                      tags: [{ tag: 'Tag1' }, { tag: 'Tag1' }, { tag: 'Tag1' }],
                    },
                    contact: {
                      phone: 'XXXXXXXXX',
                      email: 'e@mail.com',
                      tags: [{ tag: 'Tag1' }, { tag: 'Tag1' }],
                    },
                  },
                  agent: {
                    person: {
                      name: { name: 'Person' },

                      dob: Date.now().toString(),
                      gender: 'M',
                      cred: 'super safe credentials',
                      tags: [{ tag: 'Tag1' }, { tag: 'Tag1' }, { tag: 'Tag1' }],
                    },
                    contact: {
                      phone: 'XXXXXXXXX',
                      email: 'e@mail.com',
                      tags: [{ tag: 'Tag1' }, { tag: 'Tag1' }],
                    },
                    rateable: { rateable: true },
                  },
                },
              ],
            },
          ],
          payments: [
            {
              uri: 'http://payemnt.uri',
              uri_mime_type: PaymentURIMimeTypes.text_plain,
              params: {
                amount: 14521,
                currency: 'INR',
                transaction_id: '1547',
                bank_account_number: 'XXXXXXXXX',
                bank_code: 'XXXX',
                bank_id_type: 'bank id type',
                virtual_payment_address: 'XXXXX',
              },
              type: PaymentTypes.ON_ORDER,
              status: PaymentStatus.NOT_PAID,
              time: {
                label: Date.now().toString(),
                timestamp: Date.now(),
                duration: {
                  duration: '2 hours',
                },
                range: {
                  start: Date.now().toString(),
                  end: Date.now().toString(),
                },
                days: 'Monday',
                schedule: {
                  frequency: {
                    duration: '2 hours',
                  },
                  holidays: ['Tues', 'Wed'],
                  times: [
                    Date.now().toString(),
                    Date.now().toString(),
                    Date.now().toString(),
                  ],
                },
              },
            },
          ],
          offers: [
            {
              id: 'offer101',
              descriptor: {
                name: 'Descriptor',
                code: 'desc',
                symbol: 'SYM',
                short_desc: 'short description',
                long_desc: 'long description',
              },
              category_ids: [
                {
                  id: 'cat1',
                  parent_category_id: 'cat0',
                  descriptor: {
                    name: 'Descriptor',
                    code: 'desc',
                    symbol: 'SYM',
                    short_desc: 'short description',
                    long_desc: 'long description',
                  },
                },
              ],
              item_ids: [
                {
                  id: 'item1',
                  parent_item_id: 'item0',
                  descriptor: {
                    name: 'Descriptor',
                    code: 'desc',
                    symbol: 'SYM',
                    short_desc: 'short description',
                    long_desc: 'long description',
                  },
                  price: {
                    currency: 'INR',
                    value: 785,
                    estimated_value: 748,
                    computed_value: 758,
                    listed_value: 785,
                    offered_value: 785,
                    minimum_value: 700,
                    maximum_value: 900,
                  },
                  category_id: 'cat1',
                  fulfillment_id: 'ful1',
                  rating: 'superb',
                  time: {
                    label: Date.now().toString(),
                    timestamp: Date.now(),
                    duration: {
                      duration: '2 hours',
                    },
                    range: {
                      start: Date.now().toString(),
                      end: Date.now().toString(),
                    },
                    days: 'Monday',
                    schedule: {
                      frequency: {
                        duration: '2 hours',
                      },
                      holidays: ['Tues', 'Wed'],
                      times: [
                        Date.now().toString(),
                        Date.now().toString(),
                        Date.now().toString(),
                      ],
                    },
                  },
                  location_id: 'loc1',
                  rateable: { rateable: true },
                  matched: true,
                  related: true,
                  recommended: true,
                  tags: [{ tag: 'tag' }, { tag: 'tag' }, { tag: 'tag' }],
                },
              ],
              location_ids: [
                {
                  id: 'loc123',
                  descriptor: {
                    name: 'Descriptor',
                    code: 'desc',
                    symbol: 'SYM',
                    short_desc: 'short description',
                    long_desc: 'long description',
                  },
                  gps: {
                    gps: 'lat long',
                  },
                  address: {
                    address: { full: 'full address here!' },
                  },
                  station_code: 'DEL',
                  city: {
                    name: 'Delhi',
                    code: 'DEL',
                  },
                  country: {
                    name: 'INDIA',
                    code: 'IND',
                  },
                  circle: {
                    gps: {
                      gps: 'lat long',
                    },
                    radius: {
                      type: ScalarType.CONSTANT,
                      value: 8.45,
                      estimated_value: 8.45,
                      computed_value: 8.45,
                      range: {
                        min: 5,
                        max: 10,
                      },
                      unit: 'cm',
                    },
                  },
                },
                // time: {
                //   label: Date.now().toString(),
                //   timestamp: Date.now(),
                //   duration: {
                //     duration: '2 hours',
                //   },
                //   range: {
                //     start: Date.now().toString(),
                //     end: Date.now().toString(),
                //   },
                //   days: 'Monday',
                //   schedule: {
                //     frequency: {
                //       duration: '2 hours',
                //     },
                //     holidays: ['Tues', 'Wed'],
                //     times: [
                //       Date.now().toString(),
                //       Date.now().toString(),
                //       Date.now().toString(),
                //     ],
                //   },
                // },
              ],
            },
          ],
          items: [
            {
              id: 'item1',
              parent_item_id: 'item0',
              descriptor: {
                name: 'Descriptor',
                code: 'desc',
                symbol: 'SYM',
                short_desc: 'short description',
                long_desc: 'long description',
              },
              price: {
                currency: 'INR',
                value: 785,
                estimated_value: 748,
                computed_value: 758,
                listed_value: 785,
                offered_value: 785,
                minimum_value: 700,
                maximum_value: 900,
              },
              category_id: 'cat1',
              fulfillment_id: 'ful1',
              rating: 'superb',
              time: {
                label: Date.now().toString(),
                timestamp: Date.now(),
                duration: {
                  duration: '2 hours',
                },
                range: {
                  start: Date.now().toString(),
                  end: Date.now().toString(),
                },
                days: 'Monday',
                schedule: {
                  frequency: {
                    duration: '2 hours',
                  },
                  holidays: ['Tues', 'Wed'],
                  times: [
                    Date.now().toString(),
                    Date.now().toString(),
                    Date.now().toString(),
                  ],
                },
              },
              location_id: 'loc1',
              rateable: { rateable: true },
              matched: true,
              related: true,
              recommended: true,
              tags: [{ tag: 'tag' }, { tag: 'tag' }, { tag: 'tag' }],
            },
          ],
          exp: Date.now().toString(),
        },
      },
    };

    const searchData = JSON.stringify(data);

    const requestOptions = {
      body: searchData,
      redirect: 'follow',
    };

    try {
      const responseData = await lastValueFrom(
        this.httpService
          .post('http://localhost:3333/on_search', searchData)
          .pipe(
            map((response) => {
              return response.data;
            }),
          ),
      );
      // console.log(responseData);
      return responseData;
    } catch (e) {
      console.log('error: ', e);
      throw new InternalServerErrorException();
    }
  }
}
