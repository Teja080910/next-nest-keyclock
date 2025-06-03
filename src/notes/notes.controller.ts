import { 
  Controller, 
  Get, 
  Post, 
  Patch, 
  Delete, 
  Body, 
  Param, 
  UseGuards,
  ForbiddenException
} from '@nestjs/common';
import { AuthGuard, Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { KeycloakUser } from '../decorators/keycloak-user.decorator';

@Controller('notes')
@Resource('notes')
@UseGuards(AuthGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @Roles({ roles: ['user'], mode: RoleMatchingMode.ANY })
  create(@Body() createNoteDto: CreateNoteDto, @KeycloakUser() user: any) {
    return this.notesService.create(createNoteDto, user.sub);
  }

  @Get()
  @Roles({ roles: ['user'], mode: RoleMatchingMode.ANY })
  findAll(@KeycloakUser() user: any) {
    return this.notesService.findAll(user.sub);
  }

  @Get(':id')
  @Roles({ roles: ['user'], mode: RoleMatchingMode.ANY })
  findOne(@Param('id') id: string, @KeycloakUser() user: any) {
    return this.notesService.findOne(id, user.sub);
  }

  @Patch(':id')
  @Roles({ roles: ['user'], mode: RoleMatchingMode.ANY })
  update(
    @Param('id') id: string, 
    @Body() updateNoteDto: UpdateNoteDto, 
    @KeycloakUser() user: any
  ) {
    return this.notesService.update(id, updateNoteDto, user.sub);
  }

  @Delete(':id')
  @Roles({ roles: ['user'], mode: RoleMatchingMode.ANY })
  remove(@Param('id') id: string, @KeycloakUser() user: any) {
    return this.notesService.remove(id, user.sub);
  }
}