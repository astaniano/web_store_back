import { ApiProperty } from "@nestjs/swagger";

export class createRoleDto {
    @ApiProperty({example: 'ADMIN', description: 'role type'})
    readonly value: string;
    @ApiProperty({example: 'main user', description: 'describes the role'})
    readonly description: string;
}
